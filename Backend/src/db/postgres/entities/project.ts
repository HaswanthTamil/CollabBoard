import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { User } from "./user";

@Entity({ name: "project" })
export class Project {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;
    
    @ManyToOne("User", "projects")
    createdBy: User;

    @CreateDateColumn()
    createdAt: Date;
}