import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Reservation } from "src/reservation/entities/reservation.entity";

@Entity('common_zones')
export class CommonZone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 35, nullable: false})
    name: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    booking : boolean;

    @OneToMany(() => Reservation, reservation => reservation.commonZone)
    reservations: Reservation[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}
