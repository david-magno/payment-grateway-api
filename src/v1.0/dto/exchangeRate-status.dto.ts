import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class ExchangeRateStatusDTO{
    
    @Expose({name:"merchantId"})
    @IsNotEmpty()
    merchantId:String

    @Expose({name:"merchantName"})
    @IsNotEmpty()
    merchantName:String

    @Expose({name:"referenceNo"})
    @IsNotEmpty()
    referenceNo:String

    @Expose({name:"payload"})
    @IsNotEmpty()
    payload:String

    @Expose({name:"targetCurrency"})
    @IsNotEmpty()
    targetCurrency:String

    @Expose({name:"signature"})
    @IsNotEmpty()
    signature:String

    @Expose({name:"merchantAmount"})
    @IsNotEmpty()
    merchantAmount:{
        value:String,
        currency:String
    }


}