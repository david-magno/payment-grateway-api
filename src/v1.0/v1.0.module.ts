import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from 'src/shared/response';
import { ExchangeRateStatusDTO } from './dto/exchangeRate-status.dto';
import { ExchangePayment } from './entity/exchange-payment.entity';
import { ExchangeRateStatus } from './entity/exchange-rate.entity';
import { ForEx } from './entity/forex.entity';
import { V10Controller } from './v1.0.controller';
import { V10Service } from './v1.0.service';

@Module({
  imports:[TypeOrmModule.forFeature([ExchangeRateStatus,ForEx,ExchangePayment])],
  controllers: [V10Controller],
  providers: [V10Service,ExchangeRateStatusDTO,ResponseService]
})
export class V10Module {}
