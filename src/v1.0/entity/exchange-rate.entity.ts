import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("exchangerate_status")
export class ExchangeRateStatus{
    @PrimaryColumn()
    transactionId:String

    @Column()
    referenceNo:String

    @Column()
    merchantId:String
    
    @Column()
    merchantName:String

    @Column({precision:10,scale:2,type:"decimal"})
    merchantAmount:Number

    @Column()
    sourceCurrency:String

    @Column()
    targetCurrency:String

    @Column()
    exchangeRate:String

    @Column()
    exchangeRateDate:String

    @Column()
    signature:String

}