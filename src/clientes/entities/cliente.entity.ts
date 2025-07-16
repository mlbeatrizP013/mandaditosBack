import { Direccion } from "src/direccion/entities/direccion.entity";
import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    telefono: string

    @Column({unique: true})
    correo: string

    @OneToMany(()=> Pedido, (pedido) => pedido.cliente)
    pedidos: Pedido[];

    @OneToOne(() => Direccion)
    @JoinColumn()
    direccion: Direccion
    
}
