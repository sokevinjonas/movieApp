import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any ;
  imageUrl = environment.images;
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    // Récupère l'id de la route
    const id = this.route.snapshot.paramMap.get('id');
      // Vérifie si l'id est non null avant de l'utiliser
      if (id !== null) {
        this.movieService.getMovieDetails(id).subscribe((res) => {
          console.log(res);
          this.movie = res;
        });
      } else {
        console.error("ID is null"); // Gérer le cas où l'ID est null selon vos besoins
      }
  }

}
