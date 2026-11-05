import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() minimal = false;
  /** Text displayed for the minimal header navigation action. */
@Input() minimalActionLabel = 'Continue shopping';

/** Destination of the minimal header navigation action. */
@Input() minimalActionRoute = '/dashboard';
}
