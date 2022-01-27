import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTagsComponent } from './my-tags.component';

describe('MyTagsComponent', () => {
  let component: MyTagsComponent;
  let fixture: ComponentFixture<MyTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
