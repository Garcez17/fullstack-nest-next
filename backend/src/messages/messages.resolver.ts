import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Message)
  async createMessage(@Args('input') createMessageInput: CreateMessageInput) {
    return this.messagesService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'messages' })
  async getMessages() {
    return this.messagesService.findAll();
  }

  @Query(() => Message, { name: 'message' })
  async getMessagesFromUser(
    @Args('user_id', { type: () => Int }) user_id: number,
  ) {
    return this.messagesService.findMessagesFromUser(user_id);
  }

  @Mutation(() => Message)
  async updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messagesService.update(
      updateMessageInput.id,
      updateMessageInput,
    );
  }

  @Mutation(() => Message)
  async removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.remove(id);
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() parent: Message): Promise<User> {
    return this.usersService.findOne(parent.authorId);
  }
}
