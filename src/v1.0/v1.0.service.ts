import { Injectable, Logger } from '@nestjs/common';
import { ExchangeRateStatusDTO } from './dto/exchangeRate-status.dto';
import { v4 as uuidv4 } from 'uuid';
import { Connection, Repository } from "typeorm"
import { ExchangeRateStatus } from './entity/exchange-rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ForEx } from './entity/forex.entity';
import { CommonResponses, ExchangePaymentNotifResponse, ResponseService} from 'src/shared/response';
import { ExchangePaymentDTO } from './dto/exchange-payment.dto';
import { ExchangePayment } from './entity/exchange-payment.entity';
import { HttpService } from '@nestjs/axios';
import { Constansts } from 'src/shared/constants';
import { Observable } from 'rxjs';

@Injectable()
export class V10Service {
    constructor(
        @InjectRepository(ExchangeRateStatus)
        private readonly exchangeRate:Repository<ExchangeRateStatus>,
        @InjectRepository(ForEx)
        private readonly forex:Repository<ForEx>,
        @InjectRepository(ExchangePayment)
        private readonly exchangePayment:Repository<ExchangePayment>,
        private readonly responseService:ResponseService,
        private readonly htttpService:HttpService
    ){}

    async GetExchangeRateandStatus(exchangeRateStatusDTO:ExchangeRateStatusDTO){
        let responseMessage = this.responseService.errorResponse(CommonResponses.generalError)
        if(await this.verifyTransaction(null,exchangeRateStatusDTO.referenceNo)){
            responseMessage = this.responseService.errorResponse(CommonResponses.duplicatePartnerReferenceNo)
        }
        else if(!exchangeRateStatusDTO){
            responseMessage = this.responseService.errorResponse(CommonResponses.badRequest)
        }
        else if(!exchangeRateStatusDTO.merchantId){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,": No Merchant ID provided")
        }
        else if(!exchangeRateStatusDTO.payload){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,": Payload not provided")
        }
        else if(!exchangeRateStatusDTO.referenceNo){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,": No reference number provided")
        }
        else if(!exchangeRateStatusDTO.merchantAmount || !exchangeRateStatusDTO.merchantAmount.currency || !exchangeRateStatusDTO.merchantAmount.value){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,": No Amount/Currency provided")
        }
        else if(!exchangeRateStatusDTO.targetCurrency){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,": No Target Currency provided")
        }
        else if(!exchangeRateStatusDTO.signature){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,": No Signature provided")
        }
        else{
             //generate transactionId
            const trxId = uuidv4();
            //get UTC date
            const exchange = await this.getExchangeRate(exchangeRateStatusDTO.merchantAmount.currency,exchangeRateStatusDTO.targetCurrency)
            if(!exchange){
                responseMessage = this.responseService.errorResponseParam(CommonResponses.featureNotAllowedAtThisTime,": Could not get current Currency Value.")
                return responseMessage
            }
            const response = {
                transactionid:`${trxId}`,
                referenceNo:`${exchangeRateStatusDTO.referenceNo}`,
                merchantId:`${exchangeRateStatusDTO.merchantId}`,
                merchantName:`${exchangeRateStatusDTO.merchantName}`,
                merchantStatus:`${1}`,
                merchantAmount:exchangeRateStatusDTO.merchantAmount,
                targetCurrency:`${exchangeRateStatusDTO.targetCurrency}`,
                exchangeRate: `${exchange.rate}`,
                exchangeRateDate:exchange.date,
            }
// 
            await this.saveTransaction(trxId,exchange.date,exchange.rate,exchangeRateStatusDTO)

            return response
        }
        return responseMessage
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
            exchangeRateDate:date,
            signature:exchangeRateStatusDTO.signature
        })

        await this.exchangeRate.save(query)
        // console.log(query)
    }

    async getExchangeRate(base,to){
        try{
            const url = `${Constansts.apiUrl}&base=${base}&to=${to}&amount=1`
            const result =  await this.htttpService.get(url).toPromise()
            const time = result.data.lastUpdate
            const date = new Date(1970,0,1)
            date.setSeconds(time)
            return {rate:result.data['rate'],date}
            // return {rate:result.data.rate,date}
        }catch(err){
            Logger.log(err)
        }
                
    }

    async ExchangePaymentNotif(exchangePaymentDTO:ExchangePaymentDTO){
        let responseMessage = this.responseService.errorResponse(CommonResponses.generalError)
        
        if(!exchangePaymentDTO){
            responseMessage = this.responseService.errorResponse(CommonResponses.badRequest);
        }
        else if(!exchangePaymentDTO.partnerReferenceNo){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Partner Reference Number provided")
        }
        else if(!exchangePaymentDTO.referenceNo){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Reference Number provided")
        }
        else if(!exchangePaymentDTO.transactionDesc){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Transaction Description provided")
        }
        else if(!exchangePaymentDTO.transactionStatus){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Transaction Status provided")
        }
        else if(exchangePaymentDTO.transactionStatus!="1" && exchangePaymentDTO.transactionStatus!="2"){
            responseMessage = this.responseService.errorResponse(CommonResponses.invalidTransactionStatus)
        }
        else if(!exchangePaymentDTO.paymentDate){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Payment Date provided")
        }
        else if(!exchangePaymentDTO.paidAmount){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Paid Amount provided")
        }
        else if(!exchangePaymentDTO.signature){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Signature provided")
        }
        else if(!exchangePaymentDTO.billDetails || !exchangePaymentDTO.billDetails.exchangeRate){
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Bill Details provided or Incomplete data")
        }
        else{
            //check if reference number and transactionId matches
            //if true transacation exists - referenceNo and transactionId match
            //if false transaction not found - referenceNo and transactionId not match
            if(await this.verifyTransaction(exchangePaymentDTO.partnerReferenceNo,exchangePaymentDTO.referenceNo)){
                //true = not paid
                //false = paid
                if(!await this.checkExistingTransaction(exchangePaymentDTO.partnerReferenceNo,exchangePaymentDTO.referenceNo)){
                    responseMessage = this.responseService.errorResponse(CommonResponses.paidBill)
                    return responseMessage
                }
                const dbData = this.exchangePayment.create({
                    transactionId:exchangePaymentDTO.partnerReferenceNo,
                    referenceNo:exchangePaymentDTO.referenceNo,
                    transactionDesc:exchangePaymentDTO.transactionDesc,
                    transactionStatus:exchangePaymentDTO.transactionStatus,
                    paymentDate:exchangePaymentDTO.paymentDate,
                    paymentReff:exchangePaymentDTO.paymentRef,
                    paidAmountValue:exchangePaymentDTO.paidAmount.value,
                    paidAmountCurrency:exchangePaymentDTO.paidAmount.currency,
                    targetAmount:exchangePaymentDTO.billDetails.targetAmount.value,
                })

                await this.exchangePayment.save(dbData)  

                return ExchangePaymentNotifResponse.success(exchangePaymentDTO.transactionDesc)
            }
            else{
                responseMessage = this.responseService.errorResponse(CommonResponses.transactionNotFound)
            }
        }
        return responseMessage
    }
    async verifyTransaction(transactionId,referenceNo){
        const query = this.exchangeRate.createQueryBuilder('exchangerate_status')
        query.andWhere('referenceNo = :referenceNo',{referenceNo})

        if(transactionId){
            query.andWhere('transactionId = :transactionId',{transactionId})
        }
        const result = await query.getOne()
        return result !== null
    }

    async checkExistingTransaction(transactionid,refnum){
        const query = this.exchangePayment.createQueryBuilder("exchange_payment");
        query.andWhere('transactionId = :transactionid',{transactionid})
        .andWhere('referenceNo = :refnum',{refnum})

        const result = await query.getOne()
        return(result==null)
    }

    
}
