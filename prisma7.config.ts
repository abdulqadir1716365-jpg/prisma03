import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Aapke schema ka sahi path
  schema: "prisma/schema.prisma", 
  
  migrations: {
    path: "prisma/migrations",
  },
  
  // Database connection URL ko yahan define karein (Yeh aapke .env se URL utha lega)
  datasource: {
    url: env("DATABASE_URL"),
  },
});
