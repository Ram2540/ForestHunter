import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-buy-button',
  templateUrl: './buy-button.component.html',
  styleUrls: ['./buy-button.component.css']
})
export class BuyButtonComponent implements OnInit {
  @Output() onClick = new EventEmitter();
  @Input() text;
  @Input() myValue: number;
  @Input() isCoin = false;

  constructor() { }

  ngOnInit() {
  }

}
