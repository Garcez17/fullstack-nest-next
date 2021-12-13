import { User } from '.prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

export interface IUsersService {
  create(createUserInput: CreateUserInput): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: number, updateUserInput: UpdateUserInput): Promise<User>;
  remove(id: number): Promise<User>;
}
