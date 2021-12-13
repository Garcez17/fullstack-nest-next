import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Message } from './entities/message.entity';
import { User } from 'src/users/entities/user.entity';

import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { DeleteMessageInput } from './dto/delete-message.input';

import { IMessagesService } from './IMessages.service';
import { IUsersService } from 'src/users/IUsers.service';

export const pubSub = new PubSub();

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    @Inject('MessagesService')
    private readonly messagesService: IMessagesService,

    @Inject('UsersService')
    private readonly usersService: IUsersService,
  ) {}

  @Mutation(() => Message)
  async createMessage(
    @Args('input') createMessageInput: CreateMessageInput,
  ): Promise<Message> {
    const message = await this.messagesService.create(createMessageInput);

    pubSub.publish('messageAdded', { messageAdded: message });

    return message;
  }

  @Query(() => [Message])
  async getMessages(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Query(() => Message)
  async getMessagesFromUser(
    @Args('user_id', { type: () => Int }) user_id: string,
  ): Promise<Message[]> {
    return this.messagesService.findMessagesFromUser(Number(user_id));
  }

  @Mutation(() => Message)
  async updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ): Promise<Message> {
    return this.messagesService.update(
      updateMessageInput.id,
      updateMessageInput,
    );
  }

  @Mutation(() => Message, { nullable: true })
  async removeMessage(
    @Args('data', { type: () => Int }) data: DeleteMessageInput,
  ): Promise<Message> {
    const message = await this.messagesService.findMessageFromUser(data.userId);

    const messageCopy = message;

    if (!message) return null;

    await this.messagesService.remove(data.id);

    return messageCopy;
  }

  @Subscription(() => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() parent: Message): Promise<User> {
    return this.usersService.findOne(parent.authorId);
  }
}
