import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(){
    const response = {
      Server:'Running'
    }

    return response
  }

 
}
