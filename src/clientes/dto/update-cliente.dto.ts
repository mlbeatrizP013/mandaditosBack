import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class UpdateClienteDto {
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

    @IsBoolean()
    @IsOptional()
    active?: boolean;

}
