import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorRecipesDialogComponent } from './author-recipes-dialog.component';

describe('AuthorRecipesDialogComponent', () => {
  let component: AuthorRecipesDialogComponent;
  let fixture: ComponentFixture<AuthorRecipesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorRecipesDialogComponent]
    });
    fixture = TestBed.createComponent(AuthorRecipesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
