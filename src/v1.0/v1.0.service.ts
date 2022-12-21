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

@Injectable()
export class V10Service {
    constructor(
        @InjectRepository(ExchangeRateStatus)
        private readonly exchangeRate:Repository<ExchangeRateStatus>,
        @InjectRepository(ForEx)
        private readonly forex:Repository<ForEx>,
        @InjectRepository(ExchangePayment)
        private readonly exchangePayment:Repository<ExchangePayment>,
        private readonly responseService:ResponseService
    ){}

    async GetExchangeRateandStatus(exchangeRateStatusDTO:ExchangeRateStatusDTO){
        let responseMessage = this.responseService.errorResponse(CommonResponses.generalError)
        let temp = 0;
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
            const date = new Date().toISOString();
            const exchange = await this.getExchangeRate()
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
                exchangeRate: `${exchange}`,
                exchangeRateDate:date,
            }

            await this.saveTransaction(trxId,date,exchange,exchangeRateStatusDTO)

            return response
        }
        console.log(responseMessage,temp)
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

    async getExchangeRate(){
        try{
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = (today.getMonth() + 1).toString();
            let dd = (today.getDate()).toString();
            if (parseFloat(dd) < 10) dd = '0' + dd;
            if (parseFloat(mm) < 10) mm = '0' + mm;
            const formattedDate = `${yyyy}-${mm}-${dd}`
            const query = this.forex.createQueryBuilder("forex")
            query.andWhere('forex.date = :date',{date:formattedDate})

            
            const xcr = await query.getOne();
            if(xcr){
                return xcr.value
            }
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



    async checkStatus(refNo,signature){
        let responseMessage = this.responseService.errorResponse(CommonResponses.generalError)
        if(!signature){
          responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Signature provided")
          return responseMessage
        }
        if(refNo){
          const query = this.exchangePayment.createQueryBuilder('exchange_payment')
          query.andWhere('referenceNo = :refNo',{refNo})
          const exchangepayment = await query.getOne()
          if(exchangepayment){
              const response = {
              transactionId:exchangepayment.transactionId,
              originalPartnerReferenceNo:refNo,
              paymentAmount:{
                value:exchangepayment.paidAmountValue,
                currency:exchangepayment.paidAmountCurrency
              },
              transactionDateTime:exchangepayment.paymentDate,
              status:exchangepayment.transactionStatus,
              remarks:null,
              type:"1"
           }
           return response
          }else{
            responseMessage = this.responseService.errorResponse(CommonResponses.transactionNotFound);
          }
        }
        else{
            responseMessage = this.responseService.errorResponseParam(CommonResponses.invalidMandatoryField,"No Reference Number provided")
        }
        return responseMessage
    }

}
