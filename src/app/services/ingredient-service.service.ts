import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(private httpClient: HttpClient) {}

  searchIngredients(query: string): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `/api/ingredients/search?query=${query}`
    );
  }
}
