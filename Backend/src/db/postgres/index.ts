import { DataSource } from "typeorm";
import { NODE_ENV, POSTGRES_URI } from "../../config/index";
import { User } from "./entities/user";

const postgresDataSource = new DataSource({
  type: "postgres",
  url: POSTGRES_URI,
  synchronize: NODE_ENV === "development",
  entities: [User],
});

export default postgresDataSource;
