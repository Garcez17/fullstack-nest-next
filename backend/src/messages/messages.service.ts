import { Message } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';

@Injectable()
export class MessagesService {
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
    return this.prisma.message.findMany();
  }

  async findMessagesFromUser(id: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { authorId: Number(id) },
    });
  }

  async update(
    id: number,
    updateMessageInput: UpdateMessageInput,
  ): Promise<Message> {
    return this.prisma.message.update({
      where: { id },
      data: updateMessageInput,
    });
  }

  remove(id: number): Promise<Message> {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
