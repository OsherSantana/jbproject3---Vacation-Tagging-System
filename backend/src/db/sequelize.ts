import { Sequelize } from "sequelize-typescript";
import config from 'config'
import User from "../models/user";
import Vacation from "../models/vacation";
import VacationTag from "../models/vacation-tag";

const logging = config.get<boolean>('sequelize.logging') ? console.log : false

const sequelize = new Sequelize({
    models: [User, Vacation, VacationTag],
    dialect: 'mysql',
    ...config.get('db'),
    logging,
})

export default sequelize