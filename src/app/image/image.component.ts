import { Component, OnInit, Input, TemplateRef, EventEmitter, Output, OnChanges } from '@angular/core';
import { Image } from '../shared/models/image';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ImageArray } from '../shared/types';
import { LocalDatabaseService } from '../shared/services/local-database/local-database.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges {

  @Input() imageIndex: number;
  @Input() images: ImageArray;
  @Output() deleted : EventEmitter<ImageArray> = new EventEmitter<ImageArray>()

  model: Image;
  modalModel: Image;
  modalRef: BsModalRef;
  nextDisabled: boolean;
  prevDisabled: boolean;
  originalIndex: number;

  constructor(private modalService: BsModalService, private db: LocalDatabaseService) { }

  ngOnChanges() {
    this.model = this.images[this.imageIndex];
    this.originalIndex = this.imageIndex;
  }

  openModal(template: TemplateRef<any>) {
    this.imageIndex = this.originalIndex;
    this.loadImage();
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

  loadImage() {
    this.modalModel = this.images[this.imageIndex];
    this.nextDisabled = this.imageIndex >= this.images.length - 1;
    this.prevDisabled = this.imageIndex <= 0;
  }

  removeImage(imageId: string) {
    let newImages = this.db.remove(imageId);
    this.modalRef.hide();
    this.deleted.emit(newImages);
  }

  nextImage() {
    if (!this.nextDisabled) {
      ++this.imageIndex;
      this.loadImage();
    }
  }

  prevImage() {
    if (!this.prevDisabled) {
      --this.imageIndex;
      this.loadImage();
    }
  }
}
