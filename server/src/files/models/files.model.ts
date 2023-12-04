import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
  
@Table({
    tableName: 'files',
  })
  export class File extends Model<File> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id: number;
  
    @Column({
      type: DataType.STRING,
      defaultValue: 'Home',
    })
    name: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    type: string;
  
    @Column({
      type: DataType.STRING,
    })
    access_link: string;
  
    @Column({
      type: DataType.INTEGER,
      defaultValue: 0,
    })
    size: number;
  
    @Column({
      type: DataType.STRING,
      defaultValue: '',
    })
    path: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
    })
    user_id: number;
  
    @BelongsTo(() => User)
    user: User;
  
    @ForeignKey(() => File)
    @Column({
      type: DataType.INTEGER,
    })
    parent_id: number;
  
    @BelongsTo(() => File, { as: 'parent', onDelete: 'SET NULL' })
    parent: File;
  
    @HasMany(() => File, { foreignKey: 'parent_id', as: 'childs' })
    childs: File[];
  
    @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW,
    })
    date: Date;
  }
  