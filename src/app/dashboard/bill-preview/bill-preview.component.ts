import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.scss']
})
export class BillPreviewComponent implements OnInit {

  selectedBill: any;

  constructor() { }

  ngOnInit(): void {
  }

}
