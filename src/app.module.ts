import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V10Module } from './v1.0/v1.0.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    V10Module,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'payment_gateway',
      autoLoadEntities: true,
      synchronize: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
