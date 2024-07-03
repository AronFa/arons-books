import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
