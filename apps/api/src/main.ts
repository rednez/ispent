import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app/app.module';

function initFirebaseAdmin(serviceAccount: ServiceAccount) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);

  initFirebaseAdmin({
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  });

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
