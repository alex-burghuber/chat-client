import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
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
import {UriDialogComponent} from './components/uri-dialog/uri-dialog.component';
import {ChatComponent} from './components/chat/chat.component';
import {NewChatBottomSheetComponent} from './components/new-chat-bottom-sheet/new-chat-bottom-sheet.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UriDialogComponent,
        ChatComponent,
        NewChatBottomSheetComponent
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
        UriDialogComponent,
        NewChatBottomSheetComponent
    ],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
        {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
