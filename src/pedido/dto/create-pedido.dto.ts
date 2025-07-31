import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export enum EstatusPedido {
  EN_ESPERA = 'En espera',
  ACEPTADO = 'Aceptado',
  EN_CAMINO = 'En camino',
  ENTREGADO = 'Entregado',
}

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

  @IsEnum(EstatusPedido)
  estatus: EstatusPedido;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsDate()
  fecha?: Date;

  @Type(() => Date)
  @IsDate()
  fecha_entrega_estimada: Date;

  @Type(() => Date)
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