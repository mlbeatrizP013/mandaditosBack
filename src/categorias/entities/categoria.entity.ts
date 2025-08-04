import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre_categoria: string

    @Column()
    descripcion_categoria: string
}
