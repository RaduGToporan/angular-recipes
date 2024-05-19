import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-author-recipes-dialog',
  templateUrl: './author-recipes-dialog.component.html',
  styleUrls: ['./author-recipes-dialog.component.scss'],
})
export class AuthorRecipesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
