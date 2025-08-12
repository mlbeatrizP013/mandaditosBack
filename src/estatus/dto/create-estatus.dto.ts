/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

export class CreateEstatusDto {
    @IsNotEmpty() //puede see con EstatusEnum
    @IsString()
    @IsIn(['En espera', 'Aceptado', 'En camino', 'Entregado'], {
        message: 'El estatus debe ser uno de: En espera, Aceptado, En camino, Entregado'
    })
    estatus: string;
    @IsString()
    @IsOptional()
    comentario?: string;

    @IsNumber()
    @IsNotEmpty()
    pedidoId: number;
}