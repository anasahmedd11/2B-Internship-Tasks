import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriesComponent } from './categories/categories.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { GiftCollectionsComponent } from './gift-collections/gift-collections.component';
import { FeaturesComponent } from './features/features.component';
import { PopularItemsComponent } from './popular-items/popular-items.component';
import { PremiumGiftsComponent } from './premium-gifts/premium-gifts.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TrustedCompaniesComponent } from './trusted-companies/trusted-companies.component';
import { FooterComponent } from './footer/footer.component';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
