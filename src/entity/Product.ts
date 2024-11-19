import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column('text')
    description!: string;

    @Column('decimal')
    price!: number;

    @Column('int')
    stock!: number;

    constructor(name: string = "", description: string = "", price: number = 0, stock: number = 0) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
}
