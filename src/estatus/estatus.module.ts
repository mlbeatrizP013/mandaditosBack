import { Module } from '@nestjs/common';
import { EstatusService } from './estatus.service';
import { EstatusController } from './estatus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estatus } from './entities/estatus.entity';
import { Pedido } from '../pedido/entities/pedido.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Estatus, Pedido])],
  controllers: [EstatusController],
  providers: [EstatusService],
})
export class EstatusModule {}
