import { Module } from '@nestjs/common';

import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientModule } from '../patient/patient.module';
import { AppointmentSchema } from './models/appointment.model';

import { AppointmentStatusSchema } from './models/appointmentStatus.model';
import { AppointmentService } from './appointment.service';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [
    PatientModule,
    MongooseModule.forFeature([
      { name: 'AppointmentStatus', schema: AppointmentStatusSchema },
      { name: 'Appointment', schema: AppointmentSchema },
    ]),
  ],
  providers: [AppointmentService, StorageService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}