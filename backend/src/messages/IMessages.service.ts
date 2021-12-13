import { Message } from '.prisma/client';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';

export interface IMessagesService {
  create(createMessageInput: CreateMessageInput): Promise<Message>;
  findAll(): Promise<Message[]>;
  findMessagesFromUser(id: number): Promise<Message[]>;
  findMessageFromUser(id: number): Promise<Message>;
  update(id: number, updateMessageInput: UpdateMessageInput): Promise<Message>;
  remove(id: number): Promise<Message>;
}
