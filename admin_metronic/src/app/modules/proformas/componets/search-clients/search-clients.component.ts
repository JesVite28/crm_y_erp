import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-clients',
  templateUrl: './search-clients.component.html',
  styleUrls: ['./search-clients.component.scss']
})
export class SearchClientsComponent {

  @Input() clients:any = [];
  @Output() ClientSelected: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbActiveModal
  ) {
    
  }

  ngOnInit(): void {
    console.log(this.clients);
  }

  selectClient(client:any){
    this.ClientSelected.emit(client);
    this.modal.close();
  }
}
