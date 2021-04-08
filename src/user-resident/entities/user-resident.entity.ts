import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hash } from 'bcryptjs';

import { Department } from "src/department/entities/department.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";

@Entity('user_resident')
export class UserResident {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false})
    username: string;

    @Column({ type: 'varchar', length: 128, nullable: false, select: false})
    password: string;

    @Column({ type: 'simple-array' })
    roles: string[];

    @OneToMany(() => Reservation, reservation => reservation.userResident, {
        eager: true,
        cascade: true
    })
    reservations: Reservation[];

    @ManyToMany( type => Department, department => department.residents, {
        eager: true,
        cascade: true
    })
    @JoinTable({name: 'department_resident'})
    departments: Department[];

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
