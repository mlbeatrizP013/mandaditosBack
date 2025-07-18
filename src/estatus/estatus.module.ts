import { Module } from '@nestjs/common';
import { EstatusService } from './estatus.service';
import { EstatusController } from './estatus.controller';

@Module({
  controllers: [EstatusController],
  providers: [EstatusService],
})
export class EstatusModule {}
