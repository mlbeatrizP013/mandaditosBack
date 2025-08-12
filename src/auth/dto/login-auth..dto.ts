import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginAuthDto {
    @IsEmail()
    correo: string;

    @IsStrongPassword()
    password: string;
}