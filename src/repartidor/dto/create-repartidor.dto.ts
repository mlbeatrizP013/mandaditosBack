/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateRepartidorDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  placa: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  activo: boolean;
}