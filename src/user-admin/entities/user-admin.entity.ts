import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hash } from 'bcryptjs';
@Entity('user_admin')
export class UserAdmin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false})
    username: string;

    @Column({ type: 'varchar', length: 128, nullable: false, select: false})
    password: string;

    @Column({ type: 'simple-array' })
    roles: string[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
        async hashPassword() {
            if (!this.password) {
                return;
            }
            this.password = await hash(this.password, 10);
        }

}
