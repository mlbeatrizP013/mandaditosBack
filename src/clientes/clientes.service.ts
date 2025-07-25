import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ){}
async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    try {
      const newCliente = this.clienteRepository.create(createClienteDto);
      return await this.clienteRepository.save(newCliente);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el cliente');
    }
  }

  async findAll(): Promise<Cliente[]> {
    try {
      return await this.clienteRepository.find({ 
        relations: ['direcciones', 'pedidos'],
        where: { active: true }
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los clientes');
    }
  }

  async findOne(id: number): Promise<Cliente> {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { id },
        relations: ['direcciones', 'pedidos']
      });
      if (!cliente) {
        throw new NotFoundException(`Cliente con id:${id} no encontrado`);
      }
      return cliente;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al buscar el cliente');
    }
  }

   async findByEmail(email: string): Promise<Cliente> {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { correo: email },
        relations: ['direcciones']
      });
      if (!cliente) {
        throw new NotFoundException(`Cliente con email:${email} no encontrado`);
      }
      return cliente;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al buscar el cliente por email');
    }
  }
  
  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    try {
      const cliente = await this.clienteRepository.findOneBy({ id });
      if (!cliente) {
        throw new NotFoundException('Cliente no encontrado');
      }
      const updatedCliente = this.clienteRepository.merge(cliente, updateClienteDto);
      return await this.clienteRepository.save(updatedCliente);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al actualizar el cliente');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const cliente = await this.clienteRepository.findOneBy({ id });
      if (!cliente) {
        throw new NotFoundException("Cliente no encontrado, no se puede borrar");
      }
      await this.clienteRepository.remove(cliente);
      return { message: `El cliente se ha eliminado id:${id}` };
    } catch (error) {
      throw new InternalServerErrorException(`Ocurrió un error al borrar al cliente ${error}`);
    }
  }

    async search(busqueda: string): Promise<Cliente[]> {
    try {
      return await this.clienteRepository
        .createQueryBuilder('cliente')
        .where('cliente.nombre LIKE :busqueda', { busqueda: `%${busqueda}%` })
        .orWhere('cliente.correo LIKE :busqueda', { busqueda: `%${busqueda}%` })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException('Error en la búsqueda');
    }
  }
}
