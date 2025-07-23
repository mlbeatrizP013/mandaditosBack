import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { RepartidorModule } from './repartidor/repartidor.module';
import { PedidoModule } from './pedido/pedido.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido/entities/pedido.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Repartidor } from './repartidor/entities/repartidor.entity';
import { DireccionModule } from './direccion/direccion.module';
import { Direccion } from './direccion/entities/direccion.entity';
import { EstatusModule } from './estatus/estatus.module';
import { NotificacionModule } from './notificacion/notificacion.module';


@Module({
  imports: [ClientesModule,
     RepartidorModule,
      PedidoModule,
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mandaditos',
      entities: [Pedido, Cliente, Repartidor, Direccion],
      synchronize: true,
      }),
      DireccionModule,
      EstatusModule,
      NotificacionModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
