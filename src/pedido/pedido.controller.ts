import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) { }

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get('all')
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get('disponibles')
  disponibles() {
    return this.pedidoService.disponibles();
  }

   @Get('repartidor/:repartidorId/en-curso')
  enCurso(@Param('repartidorId', ParseIntPipe) repartidorId: number) {
    return this.pedidoService.enCursoPorRepartidor(repartidorId);
  }

  // >>> NUEVO: cambiar estatus rápido
  @Post(':id/en-camino')
  marcarEnCamino(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.actualizarEstatus(id, 'En camino', 'Repartidor inició trayecto');
  }

  @Post(':id/entregado')
  marcarEntregado(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.actualizarEstatus(id, 'Entregado', 'Pedido entregado por repartidor');
  }

  // >>> NUEVO: aceptar pedido
  

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.findOne(id);
  }


  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePedidoDto) {
    return this.pedidoService.update(id, dto);
  }

  @Post(':id/aceptar')
  aceptar(
    @Param('id', ParseIntPipe) id: number,
    @Body('repartidorId', ParseIntPipe) repartidorId: number
  ) {
    return this.pedidoService.aceptarPorRepartidor(id, repartidorId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.remove(id);
  }
}
