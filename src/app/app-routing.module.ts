import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetemailComponent } from './resetemail/resetemail.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "reset", component: ResetemailComponent},
  {path: "feed", component: FeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
