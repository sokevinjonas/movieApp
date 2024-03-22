import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  current_pages = 1;
  imageUrl = environment.images;

  constructor(
    private movieService: MovieService,
    private loadingController: LoadingController,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadMovies();
    this.translate.setDefaultLang('en');  
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      message: 'En cours...',
      spinner: 'bubbles'
    });
    await loading.present();
    
    const language = this.translate.currentLang || 'en'; // Récupérer la langue actuelle
    this.movieService.getTopRateMovies(this.current_pages, language).subscribe(res => { // Appel avec un seul argument
      loading.dismiss();
      this.movies.push(...res.results);
      console.log(res);
      event?.target.complete();
      if (event) {
        event.target.disabled = res.total_pages === this.current_pages;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.current_pages++;
    this.loadMovies(event);
  }
  changeLanguage(lang: string) {
    console.log('Langue sélectionnée :', lang);
    this.translate.use(lang); // Utiliser la langue sélectionnée
    window.location.reload(); // Rafraîchir l'application pour appliquer la nouvelle langue
  }
}
