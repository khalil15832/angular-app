import { TestBed, inject } from '@angular/core/testing';

import { LocalDatabaseService } from './local-database.service';

xdescribe('LocalDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalDatabaseService]
    });
  });

  it('should be created', inject([LocalDatabaseService], (service: LocalDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
