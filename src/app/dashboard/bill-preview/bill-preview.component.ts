import { Component, Input, OnChanges, SimpleChanges,AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.scss']
})
export class BillPreviewComponent implements OnChanges {


  @Input() selectedBill: any;
  @Input() tipo: any;
  @Input() valorSerie:any;

  green:boolean;
  red:boolean;

  tipoFactura: any = "ninguna";

  constructor() {
  }
  


  ngOnChanges(changes: SimpleChanges): void {

    if(changes.tipo){
      console.log("tipo cambió", changes.tipo)
      this.checkTipos(this.tipo);
    }
    
  }

  checkTipos(type){
    console.log("entra al checkeo de tipos")
    if(type == 0){
      console.log("ingreso")
      this.tipoFactura = "Ingreso";
      this.green==true;
      this.red==false
    }
    if(type == 1){
      console.log("salida")
      this.tipoFactura = "Salida";
      this.green==false;
      this.red==true
    }

  }
 

}
