import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { UserResident } from "src/user-resident/entities/user-resident.entity";

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false})
    number: number;

    @Column({ type: 'int', nullable: false })
    floor: number;

    @Column({ type: 'boolean', nullable: false, default: true })
    availability : boolean;

    @ManyToMany( type => UserResident, user => user.departments)
    residents: UserResident[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}
