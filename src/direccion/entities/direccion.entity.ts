import { Cliente } from "src/clientes/entities/cliente.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
