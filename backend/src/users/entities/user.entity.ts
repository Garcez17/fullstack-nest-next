import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;
}
