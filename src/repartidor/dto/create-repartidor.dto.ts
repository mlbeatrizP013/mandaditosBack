import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateRepartidorDto {
    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @IsString()
    telefono: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    correo: string

    @IsNotEmpty()
    @IsString()
    placa: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    activo: string

    @IsNotEmpty()
    @IsNumber()
    pedido: number
}
