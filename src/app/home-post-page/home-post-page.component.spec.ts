import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostPageComponent } from './home-post-page.component';

describe('HomePostPageComponent', () => {
  let component: HomePostPageComponent;
  let fixture: ComponentFixture<HomePostPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePostPageComponent]
    });
    fixture = TestBed.createComponent(HomePostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
