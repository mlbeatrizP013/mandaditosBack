import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estatus {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Pedido, pedido => pedido.historial)
    @JoinColumn({ name: 'id_pedido' })
    pedido: Pedido;

    @Column({ type: 'enum', enum: ['En espera', 'Aceptado', 'En camino', 'Entregado'] })
    estatus: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha_cambio: Date;

    @Column({ type: 'text', nullable: true })
    comentario?: string;

}
