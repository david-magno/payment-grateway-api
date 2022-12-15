import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonResponses, ResponseService } from './shared/response';
import { ExchangePayment } from './v1.0/entity/exchange-payment.entity';

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(ExchangePayment)
      private readonly exchangePayment:Repository<ExchangePayment>,
      private readonly responseService:ResponseService
  ){}

  healthCheck(){
    const response = {
      Server:'Running'
    }

    return response
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
