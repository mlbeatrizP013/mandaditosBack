import { Cliente } from "src/clientes/entities/cliente.entity";
import { Repartidor } from "src/repartidor/entities/repartidor.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    correo: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ['cliente', 'repartidor'] })
  role: 'cliente' | 'repartidor';

  @OneToOne(() => Cliente, cliente => cliente.user)
  cliente: Cliente;

  @OneToOne(() => Repartidor, repartidor => repartidor.user)
  repartidor: Repartidor;


}
