export = {
  type: 'sqlite',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: false,
};
