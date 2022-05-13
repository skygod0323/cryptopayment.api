import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

import { UserService } from '../user/user.service';
import * as bs58 from 'bs58';
import * as nacl from 'tweetnacl';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(publicKey: any, signature?): Promise<any> {

    // const msg = 'Sign';

    // console.log(msg);

    // const messageBytes = new TextEncoder().encode(msg);

    // const publicKeyBytes = bs58.decode(publicKey);
    // const signatureBytes = bs58.decode(signature)

    // console.log(signature)
    // const result = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);

    const user = await this.userService.addUser({wallet_address: publicKey}, false);
    return user;
  }

  login(user: any): string {
    const payload = {
      wallet_address: user.wallet_address,
      id: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
