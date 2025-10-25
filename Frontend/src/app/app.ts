import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TramitesList } from './components/tramites-list/tramites-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TramitesList], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Frontend');
}