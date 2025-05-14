import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent {

  name:string = '';
  isLoading: any;

  SIDEBAR: any = SIDEBAR;  
  
  permisions:any =[];

  constructor(
    public modal: NgbActiveModal,
  ){

  }

  ngOnInit():void{

  }

  addPermission(permiso:string){
    let INDEX = this.permisions.findIndex((perm:string)=> perm == permiso);
    if(INDEX != -1){
      this.permisions.splice(INDEX,1);
    }else{
      this.permisions.push(permiso);
    }
  }
  store(){
  }
}
