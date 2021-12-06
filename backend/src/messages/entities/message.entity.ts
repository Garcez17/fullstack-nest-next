import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'message' })
export class Message {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field()
  content: string;

  @Field(() => Int)
  authorId: number;

  @Field()
  createdAt: Date;
}
