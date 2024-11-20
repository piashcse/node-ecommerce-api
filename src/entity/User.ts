import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id = 0;

    @Column('text')
    email!: string;

    @Column('text')
    password! :string;

    @Column({ type: "enum", enum: ["CUSTOMER", "SELLER"], default: "CUSTOMER" })
    role = "CUSTOMER"; // Default role is CUSTOMER
}
