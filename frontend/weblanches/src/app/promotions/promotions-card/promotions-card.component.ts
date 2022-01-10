import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-promotions-card',
  templateUrl: './promotions-card.component.html',
  styleUrls: ['./promotions-card.component.css']
})
export class PromotionsCardComponent implements OnInit {

  @Input() cardPrice!: string
  @Input() cardImg!: string
  @Input() cardId!: string
  @Input() cardName!: string

  constructor() { }

  ngOnInit(): void {

  }
}
