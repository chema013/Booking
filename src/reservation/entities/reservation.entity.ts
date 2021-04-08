import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { CommonZone } from "src/common-zone/entities/common-zone.entity";
import { UserResident } from "src/user-resident/entities/user-resident.entity";

@Entity('reservation')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'boolean', default: true})
    state: boolean;

    @CreateDateColumn({ type: 'datetime' })
    start: Date;

    @CreateDateColumn({ type: 'datetime' })
    finish: Date;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @ManyToOne(() => UserResident, userResident => userResident.reservations)
    userResident: UserResident;

    @ManyToOne(() => CommonZone, commonZone => commonZone.reservations)
    commonZone: CommonZone;

}
