import { TestBed } from '@angular/core/testing';

import { SocialPostService } from './social-post.service';

describe('SocialPostService', () => {
  let service: SocialPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
