import { Injectable } from '@angular/core';
import { Lunch, Ingredient, Promotion } from '../../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:5000/api/v1'
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  
  /*  Lunch Methods */
  getLunchs(): Observable<Lunch[]>{
    return this.httpClient.get<Lunch[]>(`${this.BASE_URL}/lunch`)
  }
  
  setLunch(lunch: Lunch): Observable<{}>{
    return this.httpClient.post<{}>(`${this.BASE_URL}/lunch`, JSON.stringify(lunch), this.httpOptions)
  }
  
  getLunchById(id: number): Observable<Lunch>{
    return this.httpClient.get<Lunch>(`${this.BASE_URL}/lunch/${id}`)
  }

  updateLunch(id:number, lunch: Lunch): Observable<{}>{
    return this.httpClient.put<{}>(`${this.BASE_URL}/lunch/${id}`, JSON.stringify(lunch), this.httpOptions)
  }

  deleteLunch(id: number): Observable<{}>{
    return this.httpClient.delete<{}>(`${this.BASE_URL}/lunch/${id}`)
  }


/*  Ingredient Methods */
  getIngredients(): Observable<Ingredient[]>{
    return this.httpClient.get<Ingredient[]>(`${this.BASE_URL}/ingredient`)
  }
  
  setIngredient(ingredient: Ingredient): Observable<{}>{
    return this.httpClient.post<{}>(`${this.BASE_URL}/ingredient`, JSON.stringify(ingredient), this.httpOptions)
  }
  
  getIngredientById(id: number): Observable<Ingredient>{
    return this.httpClient.get<Ingredient>(`${this.BASE_URL}/ingredient/${id}`)
  }

  updateIngredient(id:number, ingredient: Ingredient): Observable<{}>{
    return this.httpClient.put<{}>(`${this.BASE_URL}/ingredient/${id}`, JSON.stringify(ingredient), this.httpOptions)
  }

  deleteIngredient(id: number): Observable<{}>{
    return this.httpClient.delete<{}>(`${this.BASE_URL}/ingredient/${id}`)
  }

  
/*  Promotion Methods */
  getPromotions(): Observable<Promotion[]>{
    return this.httpClient.get<Promotion[]>(`${this.BASE_URL}/promotion`)
  }
  
  setPromotion(promotionFormData: FormData): Observable<{}>{
    return this.httpClient.post<{}>(`${this.BASE_URL}/promotion`, promotionFormData)
  }
  
  getPromotionById(id: number): Observable<Promotion>{
    return this.httpClient.get<Promotion>(`${this.BASE_URL}/promotion/${id}`)
  }

  updatePromotion(id:number, promotionFormData: FormData): Observable<{}>{
    return this.httpClient.put<{}>(`${this.BASE_URL}/promotion/${id}`, promotionFormData)
  }

  deletePromotion(id: number): Observable<{}>{
    return this.httpClient.delete<{}>(`${this.BASE_URL}/promotion/${id}`)
  }
}
