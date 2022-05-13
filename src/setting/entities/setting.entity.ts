import { Column, Entity, BeforeInsert, Exclusion, OneToMany, ManyToOne } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';

@Entity('settings')
export class Setting extends SoftDelete {
    @Column()
    name: string;

    @Column()
    value: string;
}
