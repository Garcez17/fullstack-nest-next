import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Inject } from '@nestjs/common';
import { IUsersService } from './IUsers.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject('UsersService')
    private readonly usersService: IUsersService,
  ) {}

  @Mutation(() => User)
  async createOrLoginUser(@Args('input') createUserInput: CreateUserInput) {
    const { name, email } = createUserInput;

    const trattedMail = email.toLocaleLowerCase().trim();

    let user = await this.usersService.findByEmail(createUserInput.email);

    if (!user) {
      user = await this.usersService.create({
        name,
        email: trattedMail,
      });
    }

    return user;
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
