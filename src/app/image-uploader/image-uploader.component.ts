import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ImageFile } from '../shared/models/image-file';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  @Input() icon: string;
  @Output() uploaded : EventEmitter<Array<ImageFile>> = new EventEmitter<Array<ImageFile>>();
  uploadedImages: ImageFile[];

  private currentImageFileBeingProcessedCounter: number;
  private currentImageFileBeingProcessed: File;
  private allImageFiles: FileList;
  private fileReader: FileReader;

  constructor() { }

  ngOnInit() {
    if (!this.icon) {
      this.icon = 'fa fa-plus fa-2x';
    }
  }

  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.allImageFiles = target.files;
    this.fileReader = new FileReader();
    this.currentImageFileBeingProcessedCounter = 0;
    this.uploadedImages = [];

    this.fileReader.addEventListener("load", () => {
      this.uploadedImages.push(new ImageFile(this.fileReader.result, this.currentImageFileBeingProcessed.name));
    }, false);

    this.fileReader.addEventListener('loadend', () => {
      if (this.currentImageFileBeingProcessedCounter >= this.allImageFiles.length) {
        this.uploaded.emit(this.uploadedImages);
        return;
      }
      this.processNextImageFile();
    }, false);

    this.processNextImageFile();
  }

  private processNextImageFile() {
    this.currentImageFileBeingProcessed = this.allImageFiles[this.currentImageFileBeingProcessedCounter++];
    if (this.currentImageFileBeingProcessed) {
      this.fileReader.readAsDataURL(this.currentImageFileBeingProcessed);
    }
  }
}
