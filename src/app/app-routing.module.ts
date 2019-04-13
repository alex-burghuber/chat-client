import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'app', pathMatch: 'full'}
    /* , { path: 'login', component: LoginComponent }, */
    /* , { path: '**', component: PageNotFoundComponent } */
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
