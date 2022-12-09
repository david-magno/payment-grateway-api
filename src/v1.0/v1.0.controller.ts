import { Controller, Post, Get, Body, Res} from '@nestjs/common';
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
       if(response.http && response.http != 200 && response.code != '00'){
            res.status(response.http).send({code:response.code,message:response.message})
            return
       }

       res.status(200).send(response)
       return
    }
}
