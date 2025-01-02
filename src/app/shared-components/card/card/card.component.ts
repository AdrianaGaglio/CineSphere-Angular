import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMovie } from '../../../interfaces/imovie';
import { AuthService } from '../../../auth/auth.service';
import { FavouritesService } from '../../../services/favourites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() movie!: iMovie;
  isLoggedIn!: boolean;
  userId!: number;
  route: any;
  isHome: boolean = false;
  isPresent!: boolean;

  constructor(
    private authSvc: AuthService,
    private favSvc: FavouritesService,
    private router: Router
  ) {}

  @Output() removedMovie = new EventEmitter<iMovie>();

  ngOnInit() {
    if (this.router.url === '/dashboard/userfav') {
      this.isHome = false;
    } else {
      this.isHome = true;
    }

    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    let jsonAuthData = localStorage.getItem('authData');
    if (jsonAuthData) {
      let authData = JSON.parse(jsonAuthData);
      this.userId = authData.user.id;
    }
    this.favSvc.favouritesByUser$.subscribe((favouritesByUser) => {
      if (favouritesByUser?.find((m) => m.id === this.movie.id)) {
        this.isPresent = true;
      } else {
        this.isPresent = false;
      }
    });
  }

  addMovie(add: boolean) {
    this.isPresent = add;
  }

  removeMovie(remove: boolean) {
    this.isPresent = remove;
    this.removedMovie.emit(this.movie);
  }
}