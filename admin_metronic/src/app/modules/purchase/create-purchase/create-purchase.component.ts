import { Component } from '@angular/core';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.scss']
})
export class CreatePurchaseComponent {
  full_name_user:string = '';
  sucursal_user:string = '';
  warehouse_id:string = '';
  provider_id:string = '';

  date_emision:string = '';
  type_comprobant:string = '';
  n_comprobant:string = '';
  description:string = '';

  // Detallado de la compra
  search_products:string = '';
  unit_id:string = '';
  price_unit:number = 0;
  quantity:number = 0;

  importe:number = 0;
  igv:number = 0;
  total:number = 0;

  listProducts(){}
}
