import { StorageFile } from './storage-file';
import { DownloadResponse, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import StorageConfig from './storage-config';
 

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n'),
      },
    });

    this.bucket = StorageConfig.mediaBucket;
  }

  async save(
    path: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[],
  ): Promise<string> {
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream();

    return new Promise<string>((resolve, reject) => {
      // Adicione um ouvinte para o evento "finish" no stream
      stream.on('finish', async () => {
        try {
          // Defina metadados no arquivo
          await file.setMetadata({
            metadata: object,
          });
          // Obtém o ID do objeto
          const [metadata] = await file.getMetadata();
          const objectId = metadata.id;
          console.log(metadata);
          resolve(objectId);
        } catch (error) {
          reject(error);
        }
      });

      // Envie o buffer para o stream

      stream.end(media);
    });
  }

  async delete(path: string): Promise<void> {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<StorageFile> {
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StorageFile> {
    const [metadata] = await this.storage
      .bucket(this.bucket)
      .file(path)
      .getMetadata();
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;

    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<any, any>(Object.entries(metadata || {}));
    storageFile.contentType = storageFile.metadata.get('contentType');
    return storageFile;
  }
}
