import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BannerComponent } from './home/banner/banner.component';
import { OffersComponent } from './admin/offers/offers.component';
import { SubscribeComponent } from './home/subscribe/subscribe.component';
import { TeamComponent } from './home/team/team.component';
import { ExerciseComponent } from './home/exercises/exercise.component';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './home/about/about.component';
import { GraphComponent } from './home/graph/graph.component';
import { TestimonialComponent } from './home/testimonial/testimonial.component';
import { FooterComponent } from './footer/footer.component';
import { SignupModalComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { BenefitsComponent } from './home/benefits/benefits.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { PartnersComponent } from './home/partners/partners.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import { GoogleChartsModule } from 'angular-google-charts';
import { AmplitudeChartComponent } from './admin/amplitude-chart/amplitude-chart.component';
import { ExplosiviteChartComponent } from './admin/explosivite-chart/explosivite-chart.component';
import { PhaseChartComponent } from './admin/phase-chart/phase-chart.component';
import { AsymetrieChartComponent } from './admin/asymetrie-chart/asymetrie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    OffersComponent,
    SubscribeComponent,
    TeamComponent,
    ExerciseComponent,
    LoginComponent,
    AboutComponent,
    GraphComponent,
    TestimonialComponent,
    FooterComponent,
    SignupModalComponent,
    BenefitsComponent,
    HomeComponent,
    HeaderComponent,
    AdminComponent,
    PartnersComponent,
    AmplitudeChartComponent,
    ExplosiviteChartComponent,
    PhaseChartComponent,
    AsymetrieChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    GoogleChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
