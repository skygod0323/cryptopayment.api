import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { Purchase } from './entities/purchase.entity';
import { getFromDto } from '../common/utils/repository.util';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { BuyTicketDto } from './dtos/buy-ticket.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>
  ) {}

  async addUser(payload: CreateUserDto, throwError = true): Promise<User> {
    const found = await this.findUserByWalletAddress(payload.wallet_address);
    if (found) {
      if (throwError) {
        // throw new BadRequestException('Email already taken');
        return false as any;
      } else {
        return found;
      }
    }
    const user: User = getFromDto(payload, new User());
    await this.userRepository.save(user);

    return await this.findUserByWalletAddress(user.wallet_address);
  }

  updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findUserByWalletAddress(wallet_address: string): Promise<User> {
    return this.userRepository.findOne({
      where: { wallet_address: wallet_address.toLowerCase() },
    });
  }

  findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {id}
    })
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find({
      where: {role: 'CUSTOMER'},
      relations: ['banners', 'top_buttons', 'top_sponsors', 'featured_tokens', 'search_bars']
    })

    return users.map(user => user.toUserDto());
  }

  async userTickets(wallet_address: any): Promise<any> {
    const tickets = await this.purchaseRepository.find({
      where: {wallet_address: wallet_address}
    })

    return tickets;
  }

  async buyTickets(payload: BuyTicketDto): Promise<any> {
    const purchase: Purchase = getFromDto(payload, new Purchase());
    this.purchaseRepository.save(purchase);

    const tickets = await this.userTickets(payload.wallet_address);

    return tickets;
  }

  async prizePool(): Promise<any> {
    const res = await this.purchaseRepository.createQueryBuilder('purchases').select("SUM(purchases.cost)", 'prize').getRawOne();
    console.log(res);
    return res;
  }
}
