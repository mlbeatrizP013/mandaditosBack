import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificacionGateway{
  @WebSocketServer()
  server: Server;

  notificarPedidoNuevo(pedido: any){
    console.log('🔔 Emitiendo nuevo pedido vía WebSocket:', pedido.id);
    this.server.emit('nuevo-pedido', pedido)
  }
}
