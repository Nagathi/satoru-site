import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  inputs: ['nome']
})
export class HomeComponent {
  img1: string = 'assets/imagens/img1.webp'
  img2: string = 'assets/imagens/img2.webp'
  img3: string = 'assets/imagens/img3.webp'
  img4: string = 'assets/imagens/img4.webp'
  img5: string = 'assets/imagens/img5.webp'
  img6: string = 'assets/imagens/img6.webp'
  img7: string = 'assets/imagens/img7.webp'
  img8: string = 'assets/imagens/img8.webp'
  img9: string = 'assets/imagens/img9.webp'
 
}
