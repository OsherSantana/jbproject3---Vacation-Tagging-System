import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from "sequelize-typescript";
import User from "./user";
import Vacation from "./vacation";

@Table({
    tableName: "vacation_tags",
    underscored: true,
})
export default class VacationTag extends Model {

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string

    @ForeignKey(() => Vacation)
    @AllowNull(false)
    @Column(DataType.UUID)
    vacationId: string

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Vacation)
    vacation: Vacation
}