import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id = 0;

    @Column({ type: "varchar" }) // Ensure "varchar" is specified for email
    email ="";

    @Column({ type: "varchar" }) // Ensure "varchar" is specified for password
    password ="";
}
