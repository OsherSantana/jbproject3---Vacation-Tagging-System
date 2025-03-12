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
    timestamps: true,
    modelName: "VacationTag"
})
export default class VacationTag extends Model {

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    userId: string

    @ForeignKey(() => Vacation)
    @AllowNull(false)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    vacationId: string

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Vacation)
    vacation: Vacation
}