import {
    AllowNull,
    Column,
    DataType,
    Default,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import VacationTag from "./vacation-tag";

@Table({
    tableName: "users",
    underscored: true,
})
export default class User extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    firstName: string

    @AllowNull(false)
    @Column(DataType.STRING)
    lastName: string

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string

    @AllowNull(false)
    @Column(DataType.ENUM('user', 'admin'))
    role: string

    @HasMany(() => VacationTag)
    vacationTags: VacationTag[]
}