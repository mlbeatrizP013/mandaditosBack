import { PartialType } from '@nestjs/mapped-types';
import { CreateDireccionDto } from './create-direccion.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDireccionDto {
    @IsString()
    @IsOptional()
    calle?: string;

    @IsNumber()
    @IsOptional()
    num_casa?: number;

    @IsNumber()
    @IsOptional()
    CP?: number;

    @IsString()
    @IsOptional()
    colonia?: string;

    @IsString()
    @IsOptional()
    municipio?: string;

    @IsString()
    @IsOptional()
    estado?: string;

    @IsString()
    @IsOptional()
    alias?: string;

    @IsString()
    @IsOptional()
    referencia?: string;
}
