import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("forex")
export class ForEx{
    @PrimaryColumn()
    forexId:Number

    @Column()
    date:String

    @Column({type:"decimal",scale:6,precision:10})
    value:Number

    @Column()
    currency:String

    @Column()
    targetCurrency:String

}