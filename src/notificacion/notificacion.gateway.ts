import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@WebSocketGateway()
export class NotificacionGateway {
  @WebSocketServer()
  server: Server;

  notificarPedidoNuevo(pedido: Pedido) {
    console.log('🔔 Emitiendo nuevo pedido vía WebSocket:', pedido.id);
    this.server.emit('nuevo-pedido', pedido);
  }

  notificarPedidoAceptado(pedido: Pedido) {
    console.log('✅ Pedido aceptado:', pedido.id);
    this.server.emit('pedido-aceptado', pedido);
  }

  notificarPedidoEnCamino(pedido: Pedido) {
    console.log('🚚 Pedido en camino:', pedido.id);
    this.server.emit('pedido-en-camino', pedido);
  }

  notificarPedidoEntregado(pedido: Pedido) {
    console.log('📦 Pedido entregado:', pedido.id);
    this.server.emit('pedido-entregado', pedido);
  }
}