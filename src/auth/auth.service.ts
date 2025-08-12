import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Repartidor } from 'src/repartidor/entities/repartidor.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth..dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Repartidor) private repartidorRepo: Repository<Repartidor>,

  ) { }

  async login(dto: LoginAuthDto) {
    const user = await this.userRepo.findOne({ where: { correo: dto.correo } });
    if (!user) throw new UnauthorizedException('Datos incorrectos, verifica correo y contraseña');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    let perfil: Cliente | Repartidor;

    if (user.role === 'cliente') {
      const cliente = await this.clienteRepo.findOne({ where: { user: { id: user.id } } });
      if (!cliente) throw new UnauthorizedException('Perfil de cliente no encontrado');
      perfil = cliente;
    } else if (user.role === 'repartidor') {
      const repartidor = await this.repartidorRepo.findOne({ where: { user: { id: user.id } } });
      if (!repartidor) throw new UnauthorizedException('Perfil de repartidor no encontrado');
      perfil = repartidor;
    } else {
      throw new UnauthorizedException('Rol no reconocido');
    }


    const payload = { sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload)

    return {
      access_token: token,
      role: user.role,
      perfil
    }
  }

  async register(dto: RegisterAuthDto) {
    const existingUser = await this.userRepo.findOne({ where: { correo: dto.correo } });
    if (existingUser) throw new UnauthorizedException('El correo ya está registrado');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      correo: dto.correo,
      password: hashedPassword,
      role: dto.role,
    });
    await this.userRepo.save(user);

    if (dto.role === 'cliente') {
      const cliente = this.clienteRepo.create({
        nombre: dto.nombre,
        telefono: dto.telefono,
        user,
      });
      await this.clienteRepo.save(cliente);
    } else if (dto.role === 'repartidor') {
      const repartidor = this.repartidorRepo.create({
        nombre: dto.nombre,
        telefono: dto.telefono,
        user,
      });
      await this.repartidorRepo.save(repartidor);
    }

    return { message: 'Usuario registrado exitosamente' };
  }

}
