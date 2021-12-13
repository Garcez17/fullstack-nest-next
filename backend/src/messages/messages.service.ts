import { Message } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { IMessagesService } from './IMessages.service';

@Injectable()
export class MessagesService implements IMessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    return this.prisma.message.create({
      data: {
        content: createMessageInput.content,
        authorId: createMessageInput.authorId,
      },
    });
  }

  async findAll(): Promise<Message[]> {
    return this.prisma.message.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findMessagesFromUser(id: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { authorId: Number(id) },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findMessageFromUser(id: number): Promise<Message> {
    return this.prisma.message.findFirst({
      where: { authorId: Number(id) },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(
    id: number,
    updateMessageInput: UpdateMessageInput,
  ): Promise<Message> {
    return this.prisma.message.update({
      where: { id },
      data: {
        content: updateMessageInput.content,
      },
    });
  }

  async remove(id: number): Promise<Message> {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
