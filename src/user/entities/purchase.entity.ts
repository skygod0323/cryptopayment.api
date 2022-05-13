import { Column, Entity, BeforeInsert, Exclusion, OneToMany } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { UserDto } from '../dtos/user.dto';
import { UserRole } from '../enums/user-role.enum';

@Entity('purchases')
export class Purchase extends SoftDelete {

  @Column({ nullable: true })
  wallet_address: string;
  
  @Column()
  ticket_count: number

  @Column({type: 'double'})
  cost: number

  @Column({ nullable: true })
  contact_info: string
}
