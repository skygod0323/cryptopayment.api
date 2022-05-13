import { Column, Entity, BeforeInsert, Exclusion, OneToMany } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { UserDto } from '../dtos/user.dto';
import { UserRole } from '../enums/user-role.enum';

@Entity('users')
export class User extends SoftDelete {
  @Column({ nullable: true, default: UserRole.Customer })
  role: UserRole;


  @Column({ nullable: true })
  wallet_address: string;

  toUserDto(): UserDto {
    return {
      id: this.id,
      wallet_address: this.wallet_address,
      role: this.role,
    };
  }
}
