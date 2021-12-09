import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Transaction, ManyToMany } from "typeorm";
import { Banker } from "./Banker";
import { Transactions } from "./Transactions";
import {Person} from "./utils/Person";

@Entity('client')
export class Client extends Person {

    @Column({
        type: "numeric"
    })
    balance: number;

    @Column({
        default: true,
        name: "active"
    })
    is_active: boolean;

    @Column({
        type: "simple-json",
        nullable: true
    })
    additional_info: {
        age: number,
        hair_color: string,
    }

    @Column({
        type: "simple-array",
        default: []
    })
    family_members: string[];

    @OneToMany(
        () => Transactions,
        transaction => transaction.client
    )
    transactions: Transactions[];

    @ManyToMany(
        () => Banker,
    )
    bankers: Banker[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    banker: Banker;
}