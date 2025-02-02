import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { BookModule } from "./book/book.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        if (!config.DATABASE_URL) {
          throw new Error("DATABASE URL Is Not Defined In The Environment Variables.");
        }
        return config;
      }
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL
    ),
    AuthModule,
    BookModule,
    UserModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { };