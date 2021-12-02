import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateUserInput } from '../../users/dto/create-user.input';

// @InputType()
// export class MessageUserConnectInput {
//   @Field(() => Int)
//   readonly id: number;
// }

// @InputType()
// export class MessageUserInput {
//   @Field(() => Int, { nullable: true })
//   readonly connect: MessageUserConnectInput;

//   @Field(() => Int, { nullable: true })
//   readonly create: CreateUserInput;
// }

@InputType()
export class CreateMessageInput {
  @Field()
  content: string;

  @Field()
  authorId: number;
}
