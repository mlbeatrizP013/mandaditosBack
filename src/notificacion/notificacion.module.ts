import { Module } from '@nestjs/common';
import { NotificacionGateway } from './notificacion.gateway';

@Module({
  providers: [NotificacionGateway],
  exports: [NotificacionGateway],
})
export class NotificacionModule {
  
}
