import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(@InjectRepository(Categoria)
  private _CategoriasRepo: Repository<Categoria>
  ) { }
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    try {
      const newCliente = this._CategoriasRepo.create(createCategoriaDto);
      return await this._CategoriasRepo.save(newCliente);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la categoría nueva');
    }
  }

  async findAll() {
    try {
      const cats = await this._CategoriasRepo.find();
      return cats
    } catch (error) {
      console.error('Error al encontrar las categorías:', error);
      throw new InternalServerErrorException(
        'Error interno al recuperar todas las categorías'
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
