import { PartialType } from '@nestjs/mapped-types';
import { CreateRepartidorDto } from './create-repartidor.dto';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateRepartidorDto extends PartialType(CreateRepartidorDto) {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsEmail()
    @IsOptional()
    correo?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    placa?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
