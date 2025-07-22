import { Direccion } from "src/direccion/entities/direccion.entity";
import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    password: string

    @Column({default: true})
    active: boolean

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha_registro: Date;


    @OneToMany(() => Direccion, direccion => direccion.cliente)
    direcciones: Direccion[];


    @OneToMany(()=> Pedido, (pedido) => pedido.cliente)
    pedidos: Pedido[];

    @OneToOne(() => Direccion)
    @JoinColumn()
    direccion: Direccion
    
}
