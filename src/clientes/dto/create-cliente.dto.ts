import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    telefono: string;

    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
