import { DataSource } from "typeorm";
import { POSTGRES_URI } from "../../config/index.ts";

const postgresDataSource = new DataSource({
  type: "postgres",
  url: POSTGRES_URI,
});

export default postgresDataSource;
