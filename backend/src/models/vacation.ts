import {
    AllowNull,
    Column,
    DataType,
    Default,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import VacationTag from "./vacation-tag";

@Table({
    tableName: "vacations",
    underscored: true,
})
export default class Vacation extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    destination: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    startDate: Date

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    endDate: Date

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    price: number

    @AllowNull(false)
    @Column(DataType.STRING)
    imageFileName: string

    @HasMany(() => VacationTag)
    vacationTags: VacationTag[]
}