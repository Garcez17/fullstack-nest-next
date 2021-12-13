import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    MessagesResolver,
    PrismaService,
    {
      provide: 'UsersService',
      useClass: UsersService,
    },
    {
      provide: 'MessagesService',
      useClass: MessagesService,
    },
  ],
})
export class MessagesModule {}
