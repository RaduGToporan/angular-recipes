import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, distinctUntilChanged, switchMap } from 'rxjs';
import { IngredientService } from 'src/app/services/ingredient-service.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';

@Component({
  selector: 'app-recipes-table',
  templateUrl: './recipes-table.component.html',
  styleUrls: ['./recipes-table.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class RecipesTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'author', 'skillLevel', 'ingredients'];
  dataSource = new MatTableDataSource<any>([]);
  searchTerm: string = '';
  ingredientControl = new FormControl();
  selectedIngredients: string[] = [];
  filteredIngredients: Observable<string[]>;
  allIngredients: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog,
    private ingredientService: IngredientService
  ) {
    this.filteredIngredients = this.ingredientControl.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((query) => this.ingredientService.searchIngredients(query))
    );
  }

  ngAfterViewInit(): void {
    this.loadRecipes(0, this.paginator.pageSize);
  }

  add(event: any): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.selectedIngredients.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.ingredientControl.setValue(null);
    this.applyFilter();
  }

  remove(ingredient: string): void {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  selected(event: any): void {
    const value = event.option.viewValue;
    this.selectedIngredients.push(value);
    this.ingredientControl.setValue(null);
    if (this.inputElement && this.inputElement.nativeElement) {
      this.inputElement.nativeElement.value = '';
    }
    this.applyFilter();
  }

  loadRecipes(
    page: number,
    size: number,
    searchTerm: string = '',
    ingredients: string[] = []
  ): void {
    this.recipeService
      .getRecipes(page, size, searchTerm, ingredients)
      .subscribe({
        next: (data: any) => {
          this.dataSource.data = data.content;
          this.paginator.length = data.totalElements;
          this.paginator.pageIndex = page;
        },
        error: (error) => console.error('Error fetching recipes:', error),
      });
  }

  openDialog(recipeId: string): void {
    this.recipeService.getRecipeDetails(recipeId).subscribe({
      next: (recipeDetails) => {
        this.dialog.open(RecipeDetailsComponent, {
          width: '500px',
          data: recipeDetails,
        });
      },
      error: (error) => console.error('Error fetching recipe details:', error),
    });
  }

  applyFilter(): void {
    this.paginator.pageIndex = 0;
    this.loadRecipes(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.searchTerm,
      this.selectedIngredients
    );
  }
}
