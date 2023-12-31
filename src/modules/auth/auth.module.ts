import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import {
  CreateAccessTokenService,
  LoginService,
  RegisterService,
} from './services';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    RolesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signInOptions: {
          ...(configService.get('JWT_EXPIRATION')
            ? {
                expiresIn: Number(configService.get('JWT_EXPIRATION')),
              }
            : {}),
        },
      }),
    }),
  ],
  providers: [
    CreateAccessTokenService,
    LoginService,
    RegisterService,
    LocalStrategy,
    JwtStrategy,
    CreateAccessTokenService,
    LoginService,
    RegisterService,
  ],
  exports: [
    CreateAccessTokenService,
    LoginService,
    RegisterService,
    CreateAccessTokenService,
    LoginService,
    RegisterService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
