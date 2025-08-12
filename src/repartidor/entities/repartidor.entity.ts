import { Pedido } from "src/pedido/entities/pedido.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Repartidor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    telefono: string

    @Column({
        unique:true
    })
    correo: string

    @Column()
    placa: string

    @Column()
    password: string

    @Column({ default: true })
    activo: boolean;

    @OneToMany(() => Pedido, (pedido) => pedido.repartidor)
    pedidos: Pedido[];

    @OneToOne(() => User, user => user.repartidor)
    @JoinColumn()
    user: User;


}
