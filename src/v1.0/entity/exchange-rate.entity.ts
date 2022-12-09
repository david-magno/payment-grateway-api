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

    @Column()
    merchantAmount:String

    @Column()
    sourceCurrency:String

    @Column()
    targetCurrency:String

    @Column()
    exchangeRate:String

    @Column()
    exchangeRateDate:String

}