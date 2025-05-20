import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize} from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  configAll(){
      this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({'Authorization': 'Bearer '+ this.authservice.token});
      let URL = URL_SERVICIOS+"/purchase/config";
      return this.http.get(URL,{headers: headers}).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
    }

    searchProducts(search_product:string){
    this.isLoadingSubject.next(true);
    let LINK = "";
    if(search_product){
      LINK += "&search="+search_product;
    }
    let URL = URL_SERVICIOS+"/proformas/search-products?p=1"+LINK;
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    return this.http.get(URL,{headers:headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
