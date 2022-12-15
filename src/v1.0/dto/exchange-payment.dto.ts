import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class ExchangePaymentDTO{
    @Expose({name:"partnerReferenceNo"})
    @IsNotEmpty()
    partnerReferenceNo:String

    @Expose({name:"referenceNo"})
    @IsNotEmpty()
    referenceNo:String

    @Expose({name:"transactionDesc"})
    @IsNotEmpty()
    transactionDesc: String

    @Expose({name:"transactionStatus"})
    @IsNotEmpty()
    transactionStatus: String

    @Expose({name:"paymentDate"})
    @IsNotEmpty()
    paymentDate: String

    @Expose({name:"paymentRef"})
    @IsNotEmpty()
    paymentRef: String

    @Expose({name:"paidAmount"})
    @IsNotEmpty()
    paidAmount: {
        value: String,
        currency: String
    }

    @Expose({name:"billDetails"})
    @IsNotEmpty()
    billDetails: {
        merchantId: String,
        merchantName: String,
        merchantAmount : {
            value: String,
            currency: String
        },
        targetAmount: {
            value: String,
            currency: String
        },
        exchangeRate: String,
        exchangeDate: String
    }

    @Expose({name:"signature"})
    @IsNotEmpty()
    signature:String
}
