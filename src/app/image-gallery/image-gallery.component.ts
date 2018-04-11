import { Component, OnInit, TemplateRef } from '@angular/core';
import { Image } from '../shared/models/image';
import { ImageArray } from '../shared/types';
import { LocalDatabaseService } from '../shared/services/local-database/local-database.service';
import { ImageFile } from '../shared/models/image-file';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  public images: ImageArray;

  modalRef: BsModalRef;
  saveError: any;

  constructor(private modalService: BsModalService, private db:LocalDatabaseService) {}

  ngOnInit() {
    this.images = this.db.load();
  }

  onUploaded(uploadedImages: Array<ImageFile>) {
    this.saveError = undefined;
    let newImages = uploadedImages.map(image => {
      return new Image(image.data, image.name, new Date());
    });
    try {
      this.images = this.db.save(newImages);
    } catch(e) {
      this.saveError = {
        title: e,
        description: "Local storage has limited space, so please select a few smaller-sized images."
      };
    }
  }

  openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  removeAllImages() {
    this.images = this.db.clear();
    this.modalRef.hide()
  }
}
