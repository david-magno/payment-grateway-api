import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  healthCheck(){
    return this.appService.healthCheck()
  }

  @Post("/checkTransactionStatus")
  checkTransactionStatus(@Body('originalPartnerReferenceNo') refNo, @Body('signature') signature){
    return this.appService.checkStatus(refNo,signature)
  }
}
