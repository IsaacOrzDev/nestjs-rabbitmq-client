import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) {}

  getHello() {
    return this.client.send({ cmd: 'greeting' }, 'Progressive Coder');
  }

  async getHelloAsync() {
    const message = await this.client.send(
      { cmd: 'greeting-async' },
      'Progressive Coder',
    );
    return message;
  }

  async publishEvent() {
    this.client.emit('book-created', {
      bookName: 'The Way of Kings',
      author: 'Brandon Sanderson',
    });
  }
}
