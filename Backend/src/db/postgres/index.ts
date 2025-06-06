import { DataSource } from "typeorm";
import { NODE_ENV, POSTGRES_URI } from "../../config/index";
import { User } from "./entities/user";
import { Project } from "./entities/project";

const postgresDataSource = new DataSource({
  type: "postgres",
  url: POSTGRES_URI,
  synchronize: NODE_ENV === "development",
  entities: [User, Project], // added Project
});

export default postgresDataSource;
