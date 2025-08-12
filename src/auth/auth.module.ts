import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Repartidor } from 'src/repartidor/entities/repartidor.entity';



@Module({
  imports: [
    JwtModule.register({
      secret: 'tu_clave_secreta',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Cliente, Repartidor]),
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
