import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    pedidos: Pedido[]
}
