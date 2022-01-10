import { Injectable } from '@angular/core';
import { Lunch, MenuFilter} from '../../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {  
  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:5000/api/v1/lunch'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  private _lunchsData = new BehaviorSubject<MenuFilter>(
    {
      lunchs: [new Lunch]
    }
  )
  
  setLunch(lunch: {}): Observable<{}>{
    return this.httpClient.post<{}>(this.BASE_URL, JSON.stringify(lunch), this.httpOptions)
  }

  getLunchById(id: number): Observable<Lunch>{
    return this.httpClient.get<Lunch>(`${this.BASE_URL}/${id}`)
  }

  getAllLunchs(): Observable<Lunch[]>{
    return this.httpClient.get<Lunch[]>(this.BASE_URL)
  }

  get lunchsData(){
    return this._lunchsData.value
  }

  set lunchsData(lunchsData: MenuFilter) {
    this._lunchsData.next(lunchsData)
  }


  getLunchsByValue(min: number, max: number, lunchs: Lunch[]){
    let lanches: Lunch[] = lunchs

    let validarPrecoLanche = function(price: number){
      if(!price){
        return 0
      }
      else{
        if(typeof price == 'string'){
          price = parseFloat(price)
        }
        return price
      }
    }
    if(min && max){
      lanches = lanches.filter(lanche => (validarPrecoLanche(lanche.value ? lanche?.value : 0) <= max) && (validarPrecoLanche(lanche.value ? lanche?.value : 0) >= min))
    }
    else if(!min && max){
      lanches = lanches.filter(lanche => validarPrecoLanche(lanche.value ? lanche?.value : 0) <= max)
    }
    else if(min && !max){
      lanches = lanches.filter(lanche => validarPrecoLanche(lanche.value ? lanche?.value : 0) >= min)
    }
    return lanches
  }

  getLunchsByIngredients(lunchs: Lunch[], filterIngredients: {nome: string, status: Boolean}[]){
    let lunchHasAllIngredients = function(lunch: Lunch, filterIngredients: string[]){
      return lunch.ingredients?.every(lancheIngredient => filterIngredients.includes(lancheIngredient.name!))
    }
    let wantedIngredients: string[] = filterIngredients?.filter(x => x.status == true).map(x => x.nome)
    return lunchs.filter(lunch => lunchHasAllIngredients(lunch, wantedIngredients))
  }

  getLunchsByVeggieFilter(lunchs: Lunch[], filterVeggie: Boolean){
    if(filterVeggie == true){
      return lunchs.filter(lunch => lunch.veggie == filterVeggie)
    }
    else{
      return lunchs
    }
  }
}
    


