import { Injectable } from '@angular/core';

import { ImageArray } from '../../types';
import { Image } from '../../models/image';

@Injectable()
export class LocalFlatDatabaseService {

  private imageGalleryKey: string = 'flatImageGallery';

  constructor() { }

  save(images: ImageArray): ImageArray {
    let currentImages = this.load();
    let savedImages = [];
    images.forEach(image => {
      let storageKey = `${this.imageGalleryKey}_${image.id}`;
      try {
        localStorage.setItem(storageKey, JSON.stringify(image));
        savedImages.push(image);
      } catch {
        localStorage.removeItem(storageKey);
        console.error('Exceeded the quota');
      }
    });
    let allKeys = savedImages.map(s => s.id).concat(currentImages.map(c => c.id));
    localStorage.setItem(this.imageGalleryKey, JSON.stringify(allKeys));
    return savedImages.concat(currentImages);
  }

  private loadKeys(): string[] {
    let data = localStorage.getItem(this.imageGalleryKey);
    return data ? JSON.parse(data) : [];
  }

  load(): ImageArray {
    let images = [];
    let imageKeys = this.loadKeys();
    imageKeys.forEach(key => {
      let rawImage = localStorage.getItem(`${this.imageGalleryKey}_${key}`);
      if (rawImage) {
        let image = JSON.parse(rawImage);
        images.push(new Image(image.source, image.name, image.dateCreated, image.id));
      }
    });
    return images;
  }

  clear() {
    let imageKeys = this.loadKeys();
    imageKeys.forEach(key => {
      localStorage.removeItem(`${this.imageGalleryKey}_${key}`);
    });

    localStorage.removeItem(this.imageGalleryKey);
  }

  remove(imageId: string): ImageArray {
    let currentImages = this.load();
    let imageKeys = currentImages.map(c => c.id);

    currentImages.splice(currentImages.findIndex(image => image.id === imageId), 1);
    localStorage.removeItem(`${this.imageGalleryKey}_${imageId}`);

    imageKeys.splice(imageKeys.indexOf(imageId), 1);
    localStorage.setItem(this.imageGalleryKey, JSON.stringify(imageKeys));

    return currentImages;
  }
}
