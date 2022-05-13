import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Put,
    Query,
    Request,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dtos/user.dto';
import * as randomstring from 'randomstring';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/common/upload/upload.service';
import { compare, hash } from 'bcrypt';
import { BuyTicketDto } from './dtos/buy-ticket.dto';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(
      private readonly userService: UserService,
      private readonly uploadService: UploadService
  ) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  async all() {
    const users = await this.userService.getAllUsers();
    return {success: true, data: users};
  }

  @Get('prize_pool')
  async prizePool(
    
  ) {
    const result = await this.userService.prizePool();

    return {success: true, data: result.prize};
  }

  @Get('user_tickets')
  async userTickets(
    @Query() query,
    @Request() req
  ) {
    const result = await this.userService.userTickets(query.wallet_address);

    return {success: true, data: result};
  }

  @Post('buy_tickets')
  async buyTickes(
    @Body() body: BuyTicketDto
  ) {
    const result = await this.userService.buyTickets(body);

    return {success: true, data: result};
  }
}
