import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstatusService } from './estatus.service';
import { CreateEstatusDto } from './dto/create-estatus.dto';
import { UpdateEstatusDto } from './dto/update-estatus.dto';

@Controller('estatus')
export class EstatusController {
  constructor(private readonly estatusService: EstatusService) {}

  @Post()
  create(@Body() createEstatusDto: CreateEstatusDto) {
    return this.estatusService.create(createEstatusDto);
  }

  @Get('all')
  findAll() {
    return this.estatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estatusService.findOne(+id);
  }

   @Get('pedido/:pedidoId')
  findByPedido(@Param('pedidoId') pedidoId: string) {
    return this.estatusService.findByPedido(+pedidoId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstatusDto: UpdateEstatusDto) {
    return this.estatusService.update(+id, updateEstatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estatusService.remove(+id);
  }
}
