import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { loadingInterceptor } from './core/interceptors/loader.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HeroBannerComponent } from './pages/hero-banner/hero-banner.component';
import { GiftCollectionsComponent } from './pages/gift-collections/gift-collections.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PopularItemsComponent } from './pages/popular-items/popular-items.component';
import { PremiumGiftsComponent } from './pages/premium-gifts/premium-gifts.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { TrustedCompaniesComponent } from './pages/trusted-companies/trusted-companies.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoriesComponent,
    HeroBannerComponent,
    GiftCollectionsComponent,
    FeaturesComponent,
    PopularItemsComponent,
    PremiumGiftsComponent,
    AboutUsComponent,
    GalleryComponent,
    TestimonialsComponent,
    TrustedCompaniesComponent,
    FooterComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
