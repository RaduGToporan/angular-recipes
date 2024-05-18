import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecipeService } from 'src/app/services/recipe.service';

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

  constructor(private recipeService: RecipeService) {}

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
}
