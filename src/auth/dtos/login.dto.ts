import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  publicKey: any;

  // @ApiProperty()
  // @IsNotEmpty()
  // signature: any;
}
