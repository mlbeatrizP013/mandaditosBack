import { PartialType } from '@nestjs/mapped-types';
import { CreateEstatusDto } from './create-estatus.dto';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateEstatusDto {
    @IsOptional()
    @IsString()
    @IsIn(['En espera', 'Aceptado', 'En camino', 'Entregado'], {
        message: 'El estatus debe ser uno de: En espera, Aceptado, En camino, Entregado'
    })
    estatus?: string;

    @IsString()
    @IsOptional()
    comentario?: string;
}
