/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserLikesComponent } from './userLikes.component';

describe('UserLikesComponent', () => {
  let component: UserLikesComponent;
  let fixture: ComponentFixture<UserLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
