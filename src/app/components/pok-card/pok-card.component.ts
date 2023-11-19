import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Pokemon } from '../../models/pokemon-types';

@Component({
  selector: 'app-pok-card',
  templateUrl: './pok-card.component.html',
  styleUrls: ['./pok-card.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PokCardComponent {
  @Input() cardData!: Pokemon;
  @Input() enableAnimation = true;
  @Output() updateCart = new EventEmitter<Pokemon>();
  showCard = true;
  constructor() { }

  // Update cart list on card add/remove
  update() {
    this.cardData.isOnCart = !this.cardData.isOnCart;
    if (this.enableAnimation) { this.showCard = !this.showCard; }

    // Time out using for animation delay
    setTimeout(() => {
      this.updateCart.emit(this.cardData);
    }, 500);
  }
}
