/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreatePedidoDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  categoria: number;

  @IsNotEmpty()
  lugar_entrega: number;

  @IsNotEmpty()
  lugar_recoleccion: number;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha: Date;

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
  @IsOptional()
  repartidor: number;

  @IsOptional()
  @IsArray()
  historial?: number[];
}    