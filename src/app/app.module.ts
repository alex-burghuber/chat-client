import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
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
import {AuthDialogComponent} from './components/auth-dialog/auth-dialog.component';
import {ChatComponent} from './components/chat/chat.component';
import {AddChatDialogComponent} from './components/add-chat-dialog/add-chat-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AuthDialogComponent,
        ChatComponent,
        AddChatDialogComponent
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
        MatFormFieldModule,
        MatGridListModule,
        MatBottomSheetModule
    ],
    entryComponents: [
        AuthDialogComponent,
        AddChatDialogComponent
    ],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
