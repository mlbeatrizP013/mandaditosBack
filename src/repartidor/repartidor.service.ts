import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repartidor } from './entities/repartidor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepartidorService {

  constructor(@InjectRepository(Repartidor)
    private _RepartidorRepo: Repository<Repartidor>
  ){}
  async create(createRepartidorDto: CreateRepartidorDto) {
    try{
      const new_repartidor = this._RepartidorRepo.create(createRepartidorDto);
      await this._RepartidorRepo.save(new_repartidor);
      return new_repartidor;
    }catch(error){
      console.error('Error al crear un repartidor nuevo: ', error);
      throw new InternalServerErrorException(
        'Error al intentar crear un repatidor nuevo'
      );
    }
  }

  async findAll() {
    try{
      const repartidores = await this._RepartidorRepo.find();
      return repartidores;
    }catch (error){
      console.error('Error al encontrar repartidores:', error);
      throw new InternalServerErrorException(
        'Error interno al recuperar todos los empleados'
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} repartidor`;
  }

  update(id: number, updateRepartidorDto: UpdateRepartidorDto) {
    return `This action updates a #${id} repartidor`;
  }

  remove(id: number) {
    return `This action removes a #${id} repartidor`;
  }
}
