import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
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
}
