import { Injectable } from '@nestjs/common';
import { ExchangeRateStatusDTO } from './dto/exchangeRate-status.dto';
import { v4 as uuidv4 } from 'uuid';
import { Connection, Repository } from "typeorm"
import { ExchangeRateStatus } from './entity/exchange-rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ForEx } from './entity/forex.entity';
import { CommonResponses, ResponseService } from 'src/shared/response';

@Injectable()
export class V10Service {
    constructor(
        @InjectRepository(ExchangeRateStatus)
        private readonly exchangeRate:Repository<ExchangeRateStatus>,
        @InjectRepository(ForEx)
        private readonly forex:Repository<ForEx>
    ){}

    async GetExchangeRateandStatus(exchangeRateStatusDTO:ExchangeRateStatusDTO){
        let responseMessage = ResponseService.errorResponse(CommonResponses.doNotHonor)
        if(await this.isExisting(exchangeRateStatusDTO.referenceNo)){
            return responseMessage
        }
        //generate transactionId
        const trxId = uuidv4();
        //get UTC date
        const date = new Date().toISOString();
        const exchange = await this.getExchangeRate()
        const response = {
            transactionid:`${trxId}`,
            referenceNo:`${exchangeRateStatusDTO.referenceNo}`,
            merchantId:`${exchangeRateStatusDTO.merchantId}`,
            merchantName:`${exchangeRateStatusDTO.merchantName}`,
            merchantStatus:`${1}`,
            merchantAmount:exchangeRateStatusDTO.merchantAmount,
            targetCurrency:`${exchangeRateStatusDTO.targetCurrency}`,
            exchangeRate: `${exchange}`,
            exchangeRateDate:date,
        }

        await this.saveTransaction(trxId,date,exchange,exchangeRateStatusDTO)

        return response
        
    }
    async saveTransaction(trxId, date, exchangeRate ,exchangeRateStatusDTO:ExchangeRateStatusDTO){
        const query = this.exchangeRate.create({
            transactionId:trxId,
            referenceNo:exchangeRateStatusDTO.referenceNo,
            merchantId:exchangeRateStatusDTO.merchantId,
            merchantName:exchangeRateStatusDTO.merchantName,
            merchantAmount:exchangeRateStatusDTO.merchantAmount.value,
            sourceCurrency:exchangeRateStatusDTO.merchantAmount.currency,
            targetCurrency:exchangeRateStatusDTO.targetCurrency,
            exchangeRate:exchangeRate,
            exchangeRateDate:date
        })

        await this.exchangeRate.save(query)
        // console.log(query)
    }

    async getExchangeRate(){
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = (today.getMonth() + 1).toString();
        let dd = (today.getDate()).toString();
        if (parseFloat(dd) < 10) dd = '0' + dd;
        if (parseFloat(mm) < 10) mm = '0' + mm;
        const formattedDate = `${yyyy}/${mm}/${dd}`
        const query = this.forex.createQueryBuilder("forex")
        query.andWhere('forex.date = :date',{date:formattedDate})

        const xcr = await query.getOne();
        return xcr.value;        
    }

    async isExisting(refNum){
        const query = this.exchangeRate.createQueryBuilder('exchangerate_status');
        query.andWhere('referenceNo = :refNum',{refNum})
        const count = await query.getCount()
        if(count <= 0){
            return false;
        }
        return true;
    }

}
