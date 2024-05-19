import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}

  getRecipes(
    page: number,
    size: number,
    searchTerm: string = '',
    ingredients: string[] = []
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchTerm) {
      params = params.append('name', searchTerm);
    }

    ingredients.forEach((ingredient) => {
      params = params.append('ingredients[]', ingredient);
    });
    return this.httpClient.get(`/api/recipes`, { params });
  }

  getRecipeDetails(id: string) {
    return this.httpClient.get(`/api/recipes/${id}`);
  }

  getRecipesByAuthorName(authorName: string): Observable<any> {
    return this.httpClient.get(`/api/recipes/author`, {
      params: { authorName },
    });
  }
}
