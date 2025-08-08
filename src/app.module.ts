/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ClientesModule } from './clientes/clientes.module';
import { RepartidorModule } from './repartidor/repartidor.module';
import { PedidoModule } from './pedido/pedido.module';
import { DireccionModule } from './direccion/direccion.module';
import { CategoriasModule } from './categorias/categorias.module';
import { NotificacionModule } from './notificacion/notificacion.module';

import { Pedido } from './pedido/entities/pedido.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Repartidor } from './repartidor/entities/repartidor.entity';
import { Direccion } from './direccion/entities/direccion.entity';
import { Estatus } from './estatus/entities/estatus.entity';
import { Categoria } from './categorias/entities/categoria.entity';

import * as Joi from 'joi';
import { EstatusModule } from './estatus/estatus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_NAME: Joi.string().required(),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        CategoriasModule,
        ClientesModule,
        RepartidorModule,
        PedidoModule,
        DireccionModule,
        EstatusModule,
        NotificacionModule,
      ],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: +config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_NAME', 'mandaditos'),
        entities: [Pedido, Cliente, Repartidor, Direccion, Estatus, Categoria],
        synchronize: true,
      }),
    }),

    ClientesModule,
    RepartidorModule,
    PedidoModule,
    DireccionModule,
    CategoriasModule,
    NotificacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}