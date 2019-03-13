import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContentComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
