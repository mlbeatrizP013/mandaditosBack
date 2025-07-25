import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Direccion,Cliente,Pedido])],
  controllers: [DireccionController],
  providers: [DireccionService],
})
export class DireccionModule {}
