import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UriDialogComponent} from './components/uri-dialog/uri-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UriDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTabsModule,
        MatFormFieldModule
    ],
    entryComponents: [
        UriDialogComponent
    ],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
