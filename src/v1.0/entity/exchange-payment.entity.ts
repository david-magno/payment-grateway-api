import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("exchange_payment")
export class ExchangePayment{
    @PrimaryColumn()
    transactionId:String

    @PrimaryColumn()
    referenceNo:String

    @Column()
    transactionDesc:String

    @Column({length:1})
    transactionStatus:String

    @Column()
    paymentDate:String

    @Column()
    paymentReff:String

    @Column({precision:10,scale:2,type:"decimal"})
    paidAmountValue:Number

    @Column()
    paidAmountCurrency:String

    @Column({precision:10,scale:2,type:"decimal"})
    targetAmount:String
}