import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateStatusDTO } from './dto/exchangeRate-status.dto';
import { ExchangeRateStatus } from './entity/exchange-rate.entity';
import { ForEx } from './entity/forex.entity';
import { V10Controller } from './v1.0.controller';
import { V10Service } from './v1.0.service';

@Module({
  imports:[TypeOrmModule.forFeature([ExchangeRateStatus,ForEx])],
  controllers: [V10Controller],
  providers: [V10Service,ExchangeRateStatusDTO]
})
export class V10Module {}
