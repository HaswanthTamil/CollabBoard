import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import type { Project } from "./project";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    passwordHash: string;

    @OneToMany("Project", "createdBy")
    projects: Project[];
}