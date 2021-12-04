import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeleteMessageInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;
}
