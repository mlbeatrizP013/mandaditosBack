/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private direccionRepository: Repository<Direccion>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createDireccionDto: CreateDireccionDto): Promise<Direccion> {
    try {
      const cliente = await this.clienteRepository.findOneBy({
        id: createDireccionDto.clienteId,
      });
      if (!cliente) {
        throw new NotFoundException('Cliente no encontrado');
      }

      const newDireccion = this.direccionRepository.create({
        ...createDireccionDto,
        cliente,
      });
      return await this.direccionRepository.save(newDireccion);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al crear la dirección');
    }
  }

  async findAll(): Promise<Direccion[]> {
    try {
      return await this.direccionRepository.find({ relations: ['cliente'] });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener las direcciones',
      );
    }
  }

  async findOne(id: number): Promise<Direccion> {
    try {
      const direccion = await this.direccionRepository.findOne({
        where: { id },
        relations: ['cliente', 'pedidos_entrega', 'pedidos_recoleccion'],
      });
      if (!direccion) {
        throw new NotFoundException(`Dirección con id:${id} no encontrada`);
      }
      return direccion;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al buscar la dirección');
    }
  }

  async findByCliente(clienteId: number): Promise<Direccion[]> {
    try {
      return await this.direccionRepository.find({
        where: { cliente: { id: clienteId } },
        relations: ['cliente'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al buscar direcciones del cliente',
      );
    }
  }
  async update(
    id: number,
    updateDireccionDto: UpdateDireccionDto,
  ): Promise<Direccion> {
    try {
      const direccion = await this.direccionRepository.findOneBy({ id });
      if (!direccion) {
        throw new NotFoundException('Dirección no encontrada');
      }
      const updatedDireccion = this.direccionRepository.merge(
        direccion,
        updateDireccionDto,
      );
      return await this.direccionRepository.save(updatedDireccion);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Error al actualizar la dirección',
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const direccion = await this.direccionRepository.findOneBy({ id });
      if (!direccion) {
        throw new NotFoundException(
          'Dirección no encontrada, no se puede borrar',
        );
      }
      await this.direccionRepository.remove(direccion);
      return { message: `La dirección se ha eliminado id:${id}` };
    } catch (error) {
      throw new InternalServerErrorException(
        `Ocurrió un error al borrar la dirección ${error}`,
      );
    }
  }
}
