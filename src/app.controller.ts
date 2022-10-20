import { Controller, Get } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    await this.appService.publishEvent();
    const hello = this.appService.getHello();
    hello.subscribe((v) => console.log('hello', v));
    const helloAsync = await this.appService.getHelloAsync();
    return firstValueFrom(helloAsync);
  }
}
