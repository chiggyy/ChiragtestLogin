import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe.model';
// import { RecipeService } from './recipe.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  userDetails;
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {

    this.authservice.user.subscribe(
      res => {
        if (res) {
          this.userDetails = res.email;
        }

      },
      err => {
        console.log(err);
      }
    );
  }

}
