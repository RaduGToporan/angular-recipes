import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}

  getRecipes(page: number, size: number) {
    return this.httpClient.get(`/api/recipes?page=${page}&size=${size}`);
  }
}
