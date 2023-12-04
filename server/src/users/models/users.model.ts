import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/models/roles.model';
import { UserRoles } from 'src/roles/models/user-roles.model';

@Table({
    tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;


  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;


  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;


  @Column({
    type: DataType.BIGINT,
    defaultValue: 10737418240 
  })
  disk_space: number


  @Column({
    type: DataType.BIGINT,
    defaultValue: 0
  })
  used_space: number


  @Column({
    type: DataType.STRING
  })
  avatar: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

}