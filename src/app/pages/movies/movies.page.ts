import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular'; // Importation correcte de LoadingController
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies : any[] = [];
  current_pages = 1;
  imageUrl = environment.images;
  constructor(
    private movieService: MovieService,
    private loadingController: LoadingController // Correction de l'injection de LoadingController
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      message: 'En cours...',
      // duration: 200000,
      spinner: 'bubbles'
    });
    await loading.present();
    
    this.movieService.getTopRateMovies(this.current_pages).subscribe(res => {
      loading.dismiss();
      this.movies.push(...res.results);
      console.log(res);
      event?.target.complete();
      if(event){
        event.target.disabled = res.total_pages === this.current_pages;
      }
    });
  }

  loadMore(event : InfiniteScrollCustomEvent){
    this.current_pages++;
    this.loadMovies(event);
  }
}
