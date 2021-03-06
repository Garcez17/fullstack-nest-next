import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '@prisma/client';
import { IUsersService } from './IUsers.service';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: createUserInput,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
