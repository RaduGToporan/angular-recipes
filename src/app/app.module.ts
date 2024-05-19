import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipesTableComponent } from './components/recipes-table/recipes-table.component';
import { RecipeService } from './services/recipe.service';

@NgModule({
  declarations: [AppComponent, RecipeDetailsComponent],
  providers: [RecipeService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    RecipesTableComponent,
  ],
})
export class AppModule {}
