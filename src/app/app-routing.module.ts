import { tillRoutes } from './modules/till/till-routing.module';
import { MainTillComponent } from './modules/till/components/main-till/main-till.component';
import { IntroComponent } from './components/intro/intro.component';
import { MainAuthComponent } from './modules/auth/components/main-auth/main-auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authRoutes } from './modules/auth/auth-routing.module';
import { ExampleEditorComponent } from './modules/receipt-editor/components/example-editor/example-editor.component';

const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'auth', component: MainAuthComponent, children: authRoutes },
  { path: 'till', component: MainTillComponent, children: tillRoutes },
  { path: 'example', component: ExampleEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
