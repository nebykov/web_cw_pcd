import { BelongsToMany, Column, DataType, Table, Model } from "sequelize-typescript";
import { User } from "src/users/models/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}


@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}