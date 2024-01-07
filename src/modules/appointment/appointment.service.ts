import { Injectable } from '@nestjs/common';
import { Appointment } from '../appointment/models/appointment.model';
import { ConflictError } from 'src/common/errors/types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentDto: Model<Appointment>,
  ) {}

  async create(appointmentModel: Appointment): Promise<Appointment> {
    try {
      console.log('AQUIII', appointmentModel);
      const createdLastro = new this.appointmentDto(appointmentModel);
      return createdLastro.save();
    } catch (error) {
      throw new ConflictError('Acronym already exists');
    }
  }
}