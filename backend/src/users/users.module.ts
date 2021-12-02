import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma.service';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  providers: [UsersResolver, UsersService, PrismaService, MessagesService],
})
export class UsersModule {}
