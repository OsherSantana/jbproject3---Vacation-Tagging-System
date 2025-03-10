import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Book from "../models/book";
import Genre from "../models/genre";

const logging = config.get<boolean>('sequelize.logging') ? console.log : false

const sequelize = new Sequelize({

    models: [Genre, Book],
    dialect: 'mysql',
    ...config.get('db'),
    logging,
})

export default sequelize