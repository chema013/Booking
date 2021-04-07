import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_admin')
export class UserAdmin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false})
    username: string;

    @Column({ type: 'varchar', length: 45, nullable: false})
    password: string;

    @Column({ type: 'varchar', length: 45, nullable: false, default: 'ADMIN'})
    role: string;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}
