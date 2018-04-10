import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Image } from '../shared/models/image';
import { Utils } from '../shared/utils';
import { Settings } from '../shared/settings';
import { ImageArray } from '../shared/types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnChanges {

  @Input('images') allImages: ImageArray;
  @Output() changed: EventEmitter<ImageArray> = new EventEmitter<ImageArray>();

  public imagePages: Array<ImageArray> = [];
  public imageChunks: Array<ImageArray> = [];
  public currentPageImages: ImageArray = [];
  public page: number;
  public pages: Array<number> = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnChanges() {
    this.paginateImages();
  }

  loadImages(images: ImageArray) {
    this.changed.emit(images);
    this.allImages = images;
    this.paginateImages();
  }

  paginateImages() {
    this.route.params.subscribe(params => {
      if (!params.page && this.allImages.length > Settings.ImagesPerPage) {
        this.router.navigate(['/home', '1']);
        return;
      } else if(params.page && this.allImages.length <= Settings.ImagesPerPage) {
        this.router.navigate(['/home']);
        return;
      }

      this.page = parseInt(params.page || 1);
      this.imagePages = Utils.chunkArray(this.allImages, Settings.ImagesPerPage);

      if (this.page > this.imagePages.length) {
        this.page = this.imagePages.length;
        if (this.page) {
          this.router.navigate(['/home', this.page]);
        } else {
          this.router.navigate(['/home']);
        }
        return;
      }

      this.pages = this.imagePages.map((m, i) => i + 1);
      if (this.imagePages.length) {
        this.currentPageImages = this.imagePages[this.page - 1];
        this.imageChunks = Utils.chunkArray(this.currentPageImages, Settings.ImagesPerRow);
      } else {
        this.currentPageImages = [];
        this.imageChunks = [];
      }
    });
  }
}
