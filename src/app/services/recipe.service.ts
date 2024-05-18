import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}

  getRecipes(page: number, size: number, searchTerm: string = '') {
    let url = `/api/recipes?page=${page}&size=${size}`;
    if (searchTerm) {
      url += `&name=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpClient.get(url);
  }

  getRecipeDetails(id: string) {
    return this.httpClient.get(`/api/recipes/${id}`);
  }
}
