import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getHello(): Promise<string> {
    const users = await this.usersService.findAll();

    return `${users}`;
  }
}
