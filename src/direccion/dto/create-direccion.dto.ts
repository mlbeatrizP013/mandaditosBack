/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDireccionDto {
    @IsString()
    @IsNotEmpty()
    calle: string;

    @IsNumber()
    @IsNotEmpty()
    num_casa: number;

    @IsNumber()
    @IsNotEmpty()
    CP: number;

    @IsString()
    @IsNotEmpty()
    colonia: string;

    @IsString()
    @IsNotEmpty()
    municipio: string;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @IsString()
    @IsOptional()
    alias?: string;

    @IsString()
    @IsOptional()
    referencia?: string;

    @IsNumber()
    @IsNotEmpty()
    clienteId: number;
}
