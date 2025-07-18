import { Cliente } from "src/clientes/entities/cliente.entity";
import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Direccion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    calle: string

    @Column()
    num_casa: number

    @Column()
    CP: number

    @Column()
    colonia: string
    
    @Column()
    municipio: string

    @Column()
    estado: string

    @Column({ nullable: true })
    alias?: string;

    @Column({ type: 'text', nullable: true })
    referencia?: string;

    @ManyToOne(() => Cliente, cliente => cliente.direcciones)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente;

    @OneToMany(() => Pedido, pedido => pedido.lugar_entrega)
    pedidos_entrega: Pedido[];

    @OneToMany(() => Pedido, pedido => pedido.lugar_recoleccion)
    pedidos_recoleccion: Pedido[];

    
}
