import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <h1>Frontend</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {}