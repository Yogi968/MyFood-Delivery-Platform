import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchState } from '../../shared/services/search-state/search-state';

@Component({
  selector: 'app-header',
  imports: [MatIconModule,RouterLink,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() minimal = false;
  /** Text displayed for the minimal header navigation action. */
@Input() minimalActionLabel = 'Continue shopping';

/** Destination of the minimal header navigation action. */
@Input() minimalActionRoute = '/dashboard';

readonly searchState = inject(SearchState);

/** Updates the shared search query when the user types. */
onSearchChange(query: string): void {
  this.searchState.updateSearchQuery(query);
}
}
