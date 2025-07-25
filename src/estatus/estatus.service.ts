import { CreateEstatusDto } from './dto/create-estatus.dto';
import { UpdateEstatusDto } from './dto/update-estatus.dto';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estatus } from './entities/estatus.entity';
import { Pedido } from '../pedido/entities/pedido.entity';

@Injectable()
export class EstatusService {
  constructor(
    @InjectRepository(Estatus)
    private estatusRepository: Repository<Estatus>,
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}
  async create(createEstatusDto: CreateEstatusDto): Promise<Estatus> {
    try {
      const pedido = await this.pedidoRepository.findOneBy({ id: createEstatusDto.pedidoId });
      if (!pedido) {
        throw new NotFoundException('Pedido no encontrado');
      }

      const newEstatus = this.estatusRepository.create({
        ...createEstatusDto,
        pedido,
      });
      return await this.estatusRepository.save(newEstatus);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al crear el estatus');
    }
  }

  async findAll(): Promise<Estatus[]> {
    try {
      return await this.estatusRepository.find({ relations: ['pedido'] });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los estatus');
    }
  }

  async findOne(id: number): Promise<Estatus> {
    try {
      const estatus = await this.estatusRepository.findOne({
        where: { id },
        relations: ['pedido']
      });
      if (!estatus) {
        throw new NotFoundException(`Estatus con id:${id} no encontrado`);
      }
      return estatus;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al buscar el estatus');
    }
  }

  async findByPedido(pedidoId: number): Promise<Estatus[]> {
    try {
      return await this.estatusRepository.find({
        where: { pedido: { id: pedidoId } },
        order: { fecha_cambio: 'DESC' },
        relations: ['pedido']
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar estatus del pedido');
    }
  }

    async update(id: number, updateEstatusDto: UpdateEstatusDto): Promise<Estatus> {
    try {
      const estatus = await this.estatusRepository.findOneBy({ id });
      if (!estatus) {
        throw new NotFoundException('Estatus no encontrado');
      }
      const updatedEstatus = this.estatusRepository.merge(estatus, updateEstatusDto);
      return await this.estatusRepository.save(updatedEstatus);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al actualizar el estatus');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const estatus = await this.estatusRepository.findOneBy({ id });
      if (!estatus) {
        throw new NotFoundException("Estatus no encontrado, no se puede borrar");
      }
      await this.estatusRepository.remove(estatus);
      return { message: `El estatus se ha eliminado id:${id}` };
    } catch (error) {
      throw new InternalServerErrorException(`Ocurrió un error al borrar el estatus ${error}`);
    }
  }
}
