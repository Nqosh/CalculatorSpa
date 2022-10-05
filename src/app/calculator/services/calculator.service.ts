import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Calculator } from 'src/app/calculator/model/calculator';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  baseUrl = environment.apiUrl + 'calculator/';

constructor(private http: HttpClient) { }


SaveCalculatorData(calculator: Calculator) {
  debugger;
  return this.http.post(this.baseUrl + 'create', calculator, {});
}

}
