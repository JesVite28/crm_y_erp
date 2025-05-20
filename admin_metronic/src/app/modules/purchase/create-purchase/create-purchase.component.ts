import { Component } from '@angular/core';
import { PurchaseService } from '../service/purchase.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchProductsComponent } from '../../proformas/componets/search-products/search-products.component';
// import { EditItemPurchaseComponent } from '../components/edit-item-purchase/edit-item-purchase.component';
// import { DeleteItemPurchaseComponent } from '../components/delete-item-purchase/delete-item-purchase.component';

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
  search_product:string = '';
  unit_id:string = '';
  price_unit:number = 0;
  quantity:number = 0;

  importe:number = 0;
  igv:number = 0;
  total:number = 0;

  user:any;

  warehouses:any = [];
  providers:any = [];
  units:any = [];

  isLoading$:any;
  PRODUCT_SELECTED:any;
  PURCHASE_DETAILS:any = [];
    constructor(
    public purchaseService: PurchaseService,
    public toast: ToastrService,
    public modalService: NgbModal,
  ){

  }

  ngOnInit(): void {
    this.user = this.purchaseService.authservice.user;
    this.full_name_user = this.user.full_name;
    this.sucursal_user = this.user.sucursal_user;
    this.configAll();
    this.isLoading$ = this.purchaseService.isLoading$;
  }

  configAll(){
    this.purchaseService.configAll().subscribe((resp:any) => {
      this.warehouses = resp.warehouses;
      this.providers = resp.providers;
      this.units = resp.units;
      this.date_emision = resp.now;
    });
  }

  isLoadingProcess(){
    this.purchaseService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.purchaseService.isLoadingSubject.next(false);
    }, 50);
  }

  listProducts(){
    if(!this.search_product){
      this.toast.error("Validación","Necesitas ingresar al menos uno de los campos");
      return;
    }
    this.purchaseService.searchProducts(this.search_product).subscribe((resp:any) => {
      console.log(resp);
      if(resp.products.data.length > 1){
        this.openSelectedProduct(resp.products.data);
      }else{
        if(resp.products.data.length == 1){
          this.PRODUCT_SELECTED = resp.products.data[0];
          this.search_product = this.PRODUCT_SELECTED.title;
          this.toast.success("Exito","Se selecciono el producto");
          this.isLoadingProcess();
        }else{
          this.toast.error("Validación","No hay coincidencia en la busqueda");
        }
      }
    })
  }


  openSelectedProduct(products:any = []){
      const modalRef = this.modalService.open(SearchProductsComponent,{size:'lg',centered: true});
      modalRef.componentInstance.products = products
  
      modalRef.componentInstance.ProductSelected.subscribe((product:any) => {
        this.PRODUCT_SELECTED = product;
        this.search_product = this.PRODUCT_SELECTED.title;
        this.isLoadingProcess();
        this.toast.success("Exito","Se selecciono el producto");
      })
  }

  addDetail() {
    if (!this.PRODUCT_SELECTED) {
        this.toast.error("Validacion", "Se necesita seleccionar un producto");
        return;
    }

    if (!this.unit_id) {
        this.toast.error("Validacion", "Se necesita seleccionar una unidad");
        return;
    }

    if (!this.price_unit) {
        this.toast.error("Validacion", "Se necesita digitar un precio");
        return;
    }

    if (!this.quantity) {
        this.toast.error("Validacion", "Se necesita digitar una cantidad");
        return;
    }

    let UNIDAD_SELECTED = this.units.find((unit:any) => this.unit_id == this.unit_id)

    this.PURCHASE_DETAILS.push({
      product: this.PRODUCT_SELECTED,
      unit: UNIDAD_SELECTED,
      price_unit: this.price_unit,
      quantity: this.quantity,
      total: Number((this.price_unit * this.quantity).toFixed(2)),
    });

    this.PRODUCT_SELECTED = null;
    this.unit_id = '';
    this.price_unit = 0;
    this.quantity = 0;
    this.search_product = '';
  }
}
