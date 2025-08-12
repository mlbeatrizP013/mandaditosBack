import { IsEmail, IsEnum, IsNotEmpty, IsString, IsIn, IsBoolean, IsOptional, IsStrongPassword } from 'class-validator';

export class RegisterAuthDto {
    @IsEmail()
    correo: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
  }, { message: 'La contraseña debe tener 8+ caracteres, mayúscula, minúscula, número y símbolo' })
  password: string;

    @IsEnum(['cliente','repartidor'] as const) role: 'cliente'|'repartidor';

    @IsString()
    nombre: string;

    @IsString()
    telefono: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
    // Solo para repartidor
  @IsOptional() @IsString() placa?: string;
}