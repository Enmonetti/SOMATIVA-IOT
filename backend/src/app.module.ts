import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { CommentsModule } from './comments/comments.module';
import { TelemetryModule } from './telemetry/telemetry.module';

@Module({
  imports: [
    AuthModule,
    EquipmentsModule,
    CommentsModule,
    TelemetryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}