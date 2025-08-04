import { Categoria } from "src/categorias/entities/categoria.entity";
import { Cliente } from "src/clientes/entities/cliente.entity";
import { Direccion } from "src/direccion/entities/direccion.entity";
import { Estatus } from "src/estatus/entities/estatus.entity";
import { Repartidor } from "src/repartidor/entities/repartidor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Categoria)
    @JoinColumn({ name: 'id_categoria'})
    categoria: Categoria

    @ManyToOne(() => Direccion)
    @JoinColumn({ name: 'lugar_entrega' })
    lugar_entrega: Direccion;

    @ManyToOne(() => Direccion)
    @JoinColumn({ name: 'lugar_recoleccion' })
    lugar_recoleccion: Direccion;

    @Column({ type: 'decimal' })
    precio: number;

    @Column({ type: 'enum', enum: ['En espera', 'Aceptado', 'En camino', 'Entregado'] })
    estatus: string;

    @Column({ type: 'text', nullable: true })
    notas?: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

    @Column({ type: 'datetime' })
    fecha_entrega_estimada: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_entrega_real?: Date;

    @OneToMany(() => Estatus, historial => historial.pedido)
    historial: Estatus[];


    @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
    @JoinColumn({ name: 'id_clientes' })
    cliente: Cliente

    @ManyToOne(() => Repartidor, (repartidor) => repartidor.pedidos)
    @JoinColumn({ name: 'id_repartidor' })
    repartidor: Repartidor

}
