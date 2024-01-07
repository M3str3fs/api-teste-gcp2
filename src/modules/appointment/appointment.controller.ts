import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppointmentService } from './appointment.service';
import { Appointment } from '../appointment/models/appointment.model';
@Controller('appointment')
export class AppointmentController {
  constructor(
    private storageService: StorageService,
    private appointmentService: AppointmentService,
  ) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    }),
  )
  async createAppointment(
    @UploadedFile() objForm: Express.Multer.File,
    @Body() appointmentDto: any,
  ) {
    // console.log('FIRST', objForm);
    // console.log('SECOND', appointmentDto);

    // const bufferData = Buffer.from(appointmentDto.photo_url, 'base64');

    const objetcID: any = await this.storageService.save(
      'media/' + objForm.originalname,
      'image/jpeg',
      objForm.buffer,
      [{ mediaId: 'mediaId' }],
    );

    // Encontrar a posição da primeira barra
    const primeiraBarraIndex = objetcID.indexOf('/');
    // Cortar a string após a posição da primeira barra
    const novaString1 = objetcID.slice(primeiraBarraIndex + 1);

    const ultimaBarraIndex = novaString1.lastIndexOf('/');
    // Cortar a string a partir da posição da última barra + 1
    const gcpPath = novaString1.substring(0, ultimaBarraIndex);
    console.log(gcpPath);
    const images = await this.storageService.getWithMetaData(gcpPath);
    const storageLink = images.metadata.get('mediaLink');

    const newAppointment: any = {
      date: new Date(),
      description: 'appointmentModel.description',
      status_id: 'appointmentModel.status_id',
      image: storageLink,
    };

    // // colocar a chamada pro python

    return await this.appointmentService.create(newAppointment);
  }
}
