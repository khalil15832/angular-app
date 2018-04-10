import { UUID } from 'angular2-uuid';

export class Image {
  constructor(public source: string, public name: string, public dateCreated: Date, public id?: string) {
    if (!id) {
      this.id = UUID.UUID();
    }
  }
}
