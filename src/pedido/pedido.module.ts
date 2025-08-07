import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Repartidor } from 'src/repartidor/entities/repartidor.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { Estatus } from 'src/estatus/entities/estatus.entity';
import { NotificacionModule } from 'src/notificacion/notificacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Pedido, Cliente, Repartidor, Categoria, Direccion, Estatus
  ]),
  NotificacionModule
],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
