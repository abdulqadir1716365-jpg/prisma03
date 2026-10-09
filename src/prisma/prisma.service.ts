import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    // 1. Agar credentials hardcoded 1234 hain toh direct object pass karein taaki SCRAM auth fail na ho
    const pool = new pg.Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'users_db',
      password: 'ab1234', // Aapka password string format mein explicitly yahan pass ho gaya
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Background auth errors ko catch karne ke liye listener
    pool.on('error', (err) => {
      this.logger.error('Unexpected error on idle database client', err.stack);
    });

    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✔ Successfully connected to the database via Prisma 7 Driver!');
    } catch (error) {
      this.logger.error('❌ Database connection failed during initialization:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
