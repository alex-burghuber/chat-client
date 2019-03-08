import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './modules/app-routing/app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContentComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
