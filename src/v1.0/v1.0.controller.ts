import { Controller, Post, Get, Body, Res} from '@nestjs/common';
import { ExchangePaymentDTO } from './dto/exchange-payment.dto';
import { ExchangeRateStatusDTO } from './dto/exchangeRate-status.dto';
import { V10Service } from './v1.0.service';

@Controller('v1.0')
export class V10Controller {
    constructor(
        private readonly v10Service:V10Service
    ){}

    @Post('/GetExchangeRateandStatus')
   async GetExchangeRateandStatus(@Body() exchangeRateStatus:ExchangeRateStatusDTO,@Res() res){
       const response = await this.v10Service.GetExchangeRateandStatus(exchangeRateStatus);
       if(response.http){
            res.status(response.http).send({code:response.http+response.code,message:response.message})
            return
       }

       res.status(200).send(response)
       return
    }

    @Post('ExchangePaymentNotif')
    async ExchangePaymentNotif(@Body() exchangePaymentDTO:ExchangePaymentDTO, @Res() res){
        const response = await this.v10Service.ExchangePaymentNotif(exchangePaymentDTO)

        if(response.http){
            res.status(response.http).send({code:response.http+response.code,message:response.message})
            return
       }

       res.status(200).send(response)
       return
    }

    @Post("/checkTransactionStatus")
    async checkTransactionStatus(@Body('originalPartnerReferenceNo') refNo, @Body('signature') signature,@Res() res){
      const response = await this.v10Service.checkStatus(refNo,signature)

      if(response.http){
            res.status(response.http).send({code:response.http+response.code,message:response.message})
            return
      }

      res.status(200).send(response)
      return
    }
}
