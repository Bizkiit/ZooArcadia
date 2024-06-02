import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerTitleComponent } from './components/banner-title/banner-title.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { HabitatsComponent } from './components/habitats/habitats.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { AuthService } from '../services/auth.service';
import { AdminComponent } from './admin/admin.component';
import { VetoComponent } from './veto/veto.component';
import { EmployeComponent } from './employe/employe.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'veto', component: VetoComponent },
  { path: 'employe', component: EmployeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModule { }