import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './Product';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id = 0;

    @ManyToOne(() => Product, { eager: true })
    product!: Product;

    @Column({ type: 'int' })
    quantity = 1;
}
