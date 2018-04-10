import { Component, OnInit } from '@angular/core';
import { Image } from '../shared/models/image';
import { ImageArray } from '../shared/types';
import { LocalDatabaseService } from '../shared/services/local-database/local-database.service';
import { ImageFile } from '../shared/models/image-file';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  public images: ImageArray;

  constructor(private db:LocalDatabaseService) {}

  ngOnInit() {
    this.images = this.db.load();
  }

  onUploaded(uploadedImages: Array<ImageFile>) {
    let newImages = uploadedImages.map(image => {
      return new Image(image.data, image.name, new Date());
    });
    this.images = this.db.save(newImages);
  }
}
