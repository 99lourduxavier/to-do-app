import { Options, Dialect } from 'sequelize';
import config from './config.json';

const sequelizeConfig: Options = {
  ...config,
  define: {
    timestamps: true,
    underscored: true,
  },
  dialect: config.dialect as Dialect,
  host: config.host,
  username: config.username,
  password: config.password,
  database: config.database,
};

export { sequelizeConfig };
