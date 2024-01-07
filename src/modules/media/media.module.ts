import { Module } from "@nestjs/common";
import { StorageModule } from "src/modules/storage/storage.module";
import { MediaController } from "src/modules/media/media.controller";

@Module({
  imports: [StorageModule],
  controllers: [MediaController],
})
export class MediaModule {}