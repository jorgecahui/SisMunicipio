import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HttpClientModule  
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']  // corrige 'styleUrl' a 'styleUrls'
})
export class App {
  protected readonly title = signal('Frontend');
}