import { Injectable } from '@angular/core';
import { ImageArray } from '../../types';
import { Image } from '../../models/image';

@Injectable()
export class LocalDatabaseService {

  private imageGalleryKey: string = 'imageGallery';

  constructor() { }

  save(images: ImageArray): ImageArray {
    let currentImages = this.load();
    let allImages = images.concat(currentImages);
    localStorage.setItem(this.imageGalleryKey, JSON.stringify(allImages));
    return allImages;
  }

  load(): ImageArray {
    let allImages = localStorage.getItem(this.imageGalleryKey);
    return allImages ? JSON.parse(allImages) : [];
  }

  clear() {
    localStorage.removeItem(this.imageGalleryKey);
  }

  remove(imageId: string): ImageArray {
    let allImages = this.load();
    allImages.splice(allImages.findIndex(image => image.id === imageId), 1);
    localStorage.setItem(this.imageGalleryKey, JSON.stringify(allImages));
    return allImages;
  }
}
