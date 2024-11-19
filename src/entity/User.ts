import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id = 0;

    @Column({ type: "varchar" })
    email ="";

    @Column({ type: "varchar" })
    password ="";
}
