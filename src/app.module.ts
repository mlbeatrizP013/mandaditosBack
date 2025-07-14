import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClientesModule } from './clientes/clientes.module';
import { RepartidorModule } from './repartidor/repartidor.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [UserModule, ClientesModule, RepartidorModule, PedidoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
