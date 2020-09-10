import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
// import { RecipeListComponent } from './recipe-list/recipe-list.component';
// import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
// import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
// import { StartComponent } from './start/start.component';
// import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipe.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [

    RecipesComponent,
    // RecipeListComponent,
    // RecipeItemComponent,
    // RecipeEditComponent,
    // StartComponent,
    // RecipeDetailComponent,
  ],
  imports: [RouterModule , ReactiveFormsModule, RecipeRoutingModule , SharedModule],
  // exports: [
  //   RecipesComponent,
  //   RecipeListComponent,
  //   RecipeItemComponent,
  //   RecipeEditComponent,
  //   StartComponent,
  //   RecipeDetailComponent
  // ]
})
export class RecipeModule {

}
