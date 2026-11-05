import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchState {

  /** Stores the search query entered in the application header. */
  readonly searchQuery = signal('');

  /**
   * Updates the shared search query.
   * Trims unnecessary whitespace before storing it.
   */
  updateSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  /** Clears the current search query. */
  clearSearchQuery(): void {
    this.searchQuery.set('');
  }
}