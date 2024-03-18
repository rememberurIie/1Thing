import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from '../environments/environment.development';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetemailComponent } from './resetemail/resetemail.component';
import { PostfeedComponent } from './postfeed/postfeed.component';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetemailComponent,
    PostfeedComponent,
    FeedComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
