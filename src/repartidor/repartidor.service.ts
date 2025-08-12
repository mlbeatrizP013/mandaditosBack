/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repartidor } from './entities/repartidor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepartidorService {
  constructor(
    @InjectRepository(Repartidor)
    private _RepartidorRepo: Repository<Repartidor>,
  ) {}
  async create(createRepartidorDto: CreateRepartidorDto) {
    try {
      const new_repartidor = this._RepartidorRepo.create(createRepartidorDto);
      await this._RepartidorRepo.save(new_repartidor);
      return new_repartidor;
    } catch (error) {
      console.error('Error al crear un repartidor nuevo: ', error);
      throw new InternalServerErrorException(
        'Error al intentar crear un repatidor nuevo',
      );
    }
  }

  async findAll(): Promise<Repartidor[]> {
    try {
      const repartidores = await this._RepartidorRepo.find({
        where: { activo: true },
      });
      return repartidores;
    } catch (error) {
      console.error('Error al encontrar repartidores:', error);
      throw new InternalServerErrorException(
        'Error interno al recuperar todos los empleados',
      );
    }
  }

async findOne(id: number): Promise<Repartidor> {
  try {
    const repartidor = await this._RepartidorRepo.findOne({ where: { id } });
    if (!repartidor) {
      throw new NotFoundException('Repartidor no encontrado');
    }
    return repartidor;
  } catch (error) {
    if (error instanceof NotFoundException) throw error;
    throw new InternalServerErrorException('Error al recuperar el repartidor');
  }
}


  async update(
    id: number,
    updateRepartidorDto: UpdateRepartidorDto,
  ): Promise<Repartidor> {
    try {
      const repartidor = await this._RepartidorRepo.findOneBy({ id });
      if (!repartidor) {
        throw new NotFoundException('repartidor no encontrado');
      }
      const updatedRepartidor = this._RepartidorRepo.merge(
        repartidor,
        updateRepartidorDto,
      );
      return await this._RepartidorRepo.save(updatedRepartidor);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Error al actualizar el repartidor',
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const repartidor = await this._RepartidorRepo.findOneBy({ id });
      if (!repartidor) {
        throw new NotFoundException(
          'Repartidor no encontrado, no se puede borrar',
        );
      }
      await this._RepartidorRepo.remove(repartidor);
      return { message: `El repartidor se ha eliminado id:${id}` };
    } catch (error) {
      throw new InternalServerErrorException(
        `Ocurrió un error al borrar al repartidor ${error}`,
      );
    }
  }
}
 