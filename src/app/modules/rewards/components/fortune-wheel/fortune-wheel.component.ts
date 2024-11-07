import { Component} from '@angular/core';

@Component({
  selector: 'app-fortune-wheel',
  templateUrl: './fortune-wheel.component.html',
  styleUrls: ['./fortune-wheel.component.scss']
})
export class FortuneWheelComponent {
  items = [
    { text: '25% de descuento', color: '#FF6B6B' },
    { text: 'Envio gratis', color: '#FF8E72' },
    { text: 'Producto gratis', color: '#FFA07A' },
    { text: 'Codigo de descuento', color: '#FFB347' },
  ];

  rotation = 0;
  isSpinning = false;
  itemAngle = 360 / this.items.length;

  ngOnInit() {
    this.applyColors();
  }

  applyColors() {
    const style = document.createElement('style');
    this.items.forEach((item, index) => {
      style.textContent += `
        .section:nth-child(${index + 1}) {
          transform: rotate(${index * this.itemAngle}deg);
          background: linear-gradient(90deg, ${item.color} 0%, ${item.color} 100%);
        }
      `;
    });
    document.head.appendChild(style);
  }

  spin() {
    if (this.isSpinning) return;
    
    this.isSpinning = true;
    const extraSpins = 5;
    const randomAngle = Math.floor(Math.random() * 360);
    this.rotation += (360 * extraSpins) + randomAngle;

    setTimeout(() => {
      this.isSpinning = false;
      const winningIndex = Math.floor((360 - (this.rotation % 360)) / this.itemAngle);
      console.log('Instrumento seleccionado:', this.items[winningIndex].text);
    }, 4000);
  }
}
