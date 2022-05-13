import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly wallet_address: string;

  @ApiProperty()
  readonly role: string;
}
