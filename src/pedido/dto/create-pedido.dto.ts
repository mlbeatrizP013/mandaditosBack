import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsArray } from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsString()
  categoria: string;

  @IsNotEmpty()
  lugar_entrega: number;

  @IsNotEmpty()
  lugar_recoleccion: number;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsEnum(['En espera', 'Aceptado', 'En camino', 'Entregado'])
  estatus: string;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsDate()
  fecha?: Date;

  @IsNotEmpty()
  @IsDate()
  fecha_entrega_estimada: Date;

  @IsOptional()
  @IsDate()
  fecha_entrega_real?: Date;

  @IsNotEmpty()
  cliente: number; 

  @IsNotEmpty()
  repartidor: number;

  @IsOptional()
  @IsArray()
  historial?: number[];
}    