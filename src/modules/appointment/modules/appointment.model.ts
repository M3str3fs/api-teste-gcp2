import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Patient } from '../../patient/models/patient.model';

export type AppointmentDocument = Appointment & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Appointment {
  @Transform(({ value }) => value.toString())
  @Type(() => String)
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Patient.name,
  })
  patient_id: Patient;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  status_id: string;

  @Prop()
  image: [];
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);