import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const appRoutes: Routes = [

  {path: '', redirectTo: 'profile' , pathMatch: 'full'},
  {path: 'profile' ,
  loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule)},
  {
    path: 'auth' ,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

  }


];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes , {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
