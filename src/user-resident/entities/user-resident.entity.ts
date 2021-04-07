import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Department } from "src/department/entities/department.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";

@Entity('user_resident')
export class UserResident {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false})
    username: string;

    @Column({ type: 'varchar', length: 45, nullable: false})
    password: string;

    @Column({ type: 'varchar', length: 45, nullable: false, default: 'RESIDENT'})
    role: string;

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
}
