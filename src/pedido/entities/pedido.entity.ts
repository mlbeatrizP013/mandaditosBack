import { Cliente } from "src/clientes/entities/cliente.entity";
import { Repartidor } from "src/repartidor/entities/repartidor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    categoria: string

    @Column()
    lugar_entrega: string

    @Column()
    lugar_recoleccion: string

    @Column()
    precio: number

    @Column()
    estatus: number

    @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
    cliente: Cliente

    @ManyToOne(() => Repartidor, (repartidor) => repartidor.pedidos)
    repartidor: Repartidor
    
}
