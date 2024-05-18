import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';

@Component({
  selector: 'app-recipes-table',
  templateUrl: './recipes-table.component.html',
  styleUrls: ['./recipes-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})
export class RecipesTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'author', 'skillLevel', 'ingredients'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.loadRecipes(0, this.paginator.pageSize);
  }

  loadRecipes(page: number, size: number): void {
    this.recipeService.getRecipes(page, size).subscribe({
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
}
