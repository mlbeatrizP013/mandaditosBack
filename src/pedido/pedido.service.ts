import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
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

  if(!repartidor){
    console.log('📡 Pedido sin repartidor, notificando...');
    this.notificacionGateway.notificarPedidoNuevo(pedidoGuardado)
  }

  return pedidoGuardado;
}

  async findAll(): Promise<Pedido[]>{
    const pedidos = await this.pedidoRepository.find({
      relations: ['historial', 'cliente', 'repartidor', 'categoria', 'lugar_entrega', 'lugar_recoleccion']
    });

    const pedidos_en_espera = pedidos.filter(pedido => {
      const ultimoEstatus = pedido.historial?.[pedido.historial.length - 1];
      return ultimoEstatus?.estatus == 'En espera';
    });

    return pedidos_en_espera
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
