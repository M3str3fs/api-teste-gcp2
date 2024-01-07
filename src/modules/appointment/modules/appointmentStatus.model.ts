import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Document } from 'mongoose';

export type AppointmentStatusDocument = AppointmentStatus & Document;

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
export class AppointmentStatus {
  @Transform(({ value }) => value.toString())
  @Type(() => String)
  _id: string;

  @Prop({ required: true })
  name: string;
}

export const AppointmentStatusSchema =
  SchemaFactory.createForClass(AppointmentStatus);