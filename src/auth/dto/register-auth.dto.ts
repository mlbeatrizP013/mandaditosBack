import { IsEmail, IsNotEmpty, IsString, IsIn, IsBoolean, IsOptional } from 'class-validator';

export class RegisterAuthDto {
    @IsEmail()
    correo: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsIn(['cliente', 'repartidor'])
    role: 'cliente' | 'repartidor';

    @IsString()
    nombre: string;

    @IsString()
    telefono: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}