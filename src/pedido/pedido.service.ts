import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { IsNull, Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Repartidor } from 'src/repartidor/entities/repartidor.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { Estatus } from 'src/estatus/entities/estatus.entity';
import { NotificacionGateway } from 'src/notificacion/notificacion.gateway';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
    @InjectRepository(Repartidor) private repartidorRepository: Repository<Repartidor>,
    @InjectRepository(Categoria) private categoriaRepository: Repository<Categoria>,
    @InjectRepository(Direccion) private direccionRepository: Repository<Direccion>,
    @InjectRepository(Estatus) private estatusRepository: Repository<Estatus>,
    private readonly notificacionGateway: NotificacionGateway
  ) { }


  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const cliente = await this.clienteRepository.findOne({ where: { id: createPedidoDto.cliente } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const categoria = await this.categoriaRepository.findOne({ where: { id: createPedidoDto.categoria } });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const entrega = await this.direccionRepository.findOne({ where: { id: createPedidoDto.lugar_entrega } });
    if (!entrega) throw new NotFoundException('Dirección de entrega no encontrada');

    const recoleccion = await this.direccionRepository.findOne({ where: { id: createPedidoDto.lugar_recoleccion } });
    if (!recoleccion) throw new NotFoundException('Dirección de recolección no encontrada');

    let repartidor: Repartidor | null = null;
    if (createPedidoDto.repartidor) {
      repartidor = await this.repartidorRepository.findOne({ where: { id: createPedidoDto.repartidor } });
      if (!repartidor) throw new NotFoundException('Repartidor no encontrado');
    }

    const pedido = this.pedidoRepository.create({
      cliente,
      categoria,
      lugar_entrega: entrega,
      lugar_recoleccion: recoleccion,
      repartidor: repartidor ?? undefined,
      precio: createPedidoDto.precio,
      notas: createPedidoDto.notas,
      fecha: createPedidoDto.fecha,
      fecha_entrega_estimada: createPedidoDto.fecha_entrega_estimada,
      fecha_entrega_real: createPedidoDto.fecha_entrega_real,
    });

    const pedidoGuardado = await this.pedidoRepository.save(pedido);

    const estatusInicial = this.estatusRepository.create({
      pedido: pedidoGuardado,
      estatus: 'En espera',
      comentario: 'Pedido en espera de repartidor',
    });

    await this.estatusRepository.save(estatusInicial);

    if (!repartidor) {
      console.log('📡 Pedido sin repartidor, notificando...');
      this.notificacionGateway.notificarPedidoNuevo(pedidoGuardado)
    }

    return pedidoGuardado;
  }

  async disponibles(): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepository.find({
      where: { repartidor: IsNull() }, // sin repartidor asignado
      relations: ['historial', 'cliente', 'repartidor', 'categoria', 'lugar_entrega', 'lugar_recoleccion'],
      order: { id: 'DESC' }
    });

    // filtra por último estatus "En espera"
    return pedidos.filter(p => {
      const ultimo = p.historial?.[p.historial.length - 1];
      return ultimo?.estatus === 'En espera';
    });
  }

  async enCursoPorRepartidor(repartidorId: number): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepository.find({
      where: { repartidor: { id: repartidorId } },
      relations: ['historial', 'cliente', 'repartidor', 'categoria', 'lugar_entrega', 'lugar_recoleccion'],
      order: { id: 'DESC' }
    });

    return pedidos.filter(p => {
      const ultimo = p.historial?.[p.historial.length - 1]?.estatus;
      return ultimo === 'Aceptado' || ultimo === 'En camino';
    });
  }

  async findAll(): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepository.find({
      relations: ['historial', 'cliente', 'repartidor', 'categoria', 'lugar_entrega', 'lugar_recoleccion']
    });

    const pedidos_en_espera = pedidos.filter(pedido => {
      const ultimoEstatus = pedido.historial?.[pedido.historial.length - 1];
      return ultimoEstatus?.estatus == 'En espera';
    });

    return pedidos_en_espera
  }

  async aceptarPorRepartidor(pedidoId: number, repartidorId: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: pedidoId },
      relations: ['historial', 'repartidor']
    });
    if (!pedido) throw new NotFoundException(`Pedido con id:${pedidoId} no encontrado`);

    // no permitir aceptar si ya tiene repartidor
    if (pedido.repartidor) throw new ConflictException('Pedido ya asignado a un repartidor');

    // verificar estatus actual
    const ultimo = pedido.historial?.[pedido.historial.length - 1];
    if (ultimo?.estatus !== 'En espera') {
      throw new ConflictException(`Pedido no está disponible (estatus actual: ${ultimo?.estatus || 'N/A'})`);
    }

    // asignar repartidor
    const repartidor = await this.repartidorRepository.findOne({ where: { id: repartidorId } });
    if (!repartidor) throw new NotFoundException('Repartidor no encontrado');

    pedido.repartidor = repartidor;
    await this.pedidoRepository.save(pedido);

    // registra estatus "Aceptado" + notifica
    await this.actualizarEstatus(pedidoId, 'Aceptado', `Pedido aceptado por repartidor ${repartidorId}`);

    // opcional: recarga con relaciones completas para devolverlo listo
    const full = await this.pedidoRepository.findOne({
      where: { id: pedidoId },
      relations: ['historial', 'cliente', 'repartidor', 'categoria', 'lugar_entrega', 'lugar_recoleccion']
    });
    return full!;
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['historial', 'cliente', 'repartidor', 'categoria', 'lugar_entrega', 'lugar_recoleccion'],
    });

    if (!pedido) throw new NotFoundException(`Pedido con id:${id} no encontrado`);

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException(`Pedido con id:${id} no encontrado`);

    const entrega = await this.direccionRepository.findOne({ where: { id: updatePedidoDto.lugar_entrega } });
    if (!entrega) throw new NotFoundException('Dirección de entrega no encontrada');

    const recoleccion = await this.direccionRepository.findOne({ where: { id: updatePedidoDto.lugar_recoleccion } });
    if (!recoleccion) throw new NotFoundException('Dirección de recolección no encontrada');

    pedido.lugar_entrega = entrega;
    pedido.lugar_recoleccion = recoleccion;
    pedido.precio = updatePedidoDto.precio;
    pedido.notas = updatePedidoDto.notas ?? pedido.notas;

    return await this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<{ message: string }> {
    const pedido = await this.pedidoRepository.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException(`Pedido con id:${id} no encontrado`);

    await this.pedidoRepository.remove(pedido);
    return { message: `Pedido con id:${id} eliminado correctamente` };
  }

  async actualizarEstatus(pedidoId: number, nuevoEstatus: string, comentario?: string) {
  const pedido = await this.pedidoRepository.findOne({ where: { id: pedidoId } });
  if (!pedido) throw new NotFoundException(`Pedido con id:${pedidoId} no encontrado`);

  const estatus = this.estatusRepository.create({
    pedido,
    estatus: nuevoEstatus,
    comentario: comentario ?? '',
  });

  await this.estatusRepository.save(estatus);

  switch (nuevoEstatus) {
    case 'Aceptado':
      this.notificacionGateway.notificarPedidoAceptado(pedido);
      break;
    case 'En camino':
      this.notificacionGateway.notificarPedidoEnCamino(pedido);
      break;
    case 'Entregado':
      this.notificacionGateway.notificarPedidoEntregado(pedido);
      break;
    default:
      break;
  }

  return estatus;
}
}
