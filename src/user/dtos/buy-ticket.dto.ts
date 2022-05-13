import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BuyTicketDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  wallet_address: string;

  @ApiProperty()
  @IsNotEmpty()
  ticket_count: string

  @ApiProperty()
  @IsNotEmpty()
  cost: number
}
