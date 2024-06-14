import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { VetoComponent } from './veto/veto.component';
import { EmployeComponent } from './employe/employe.component';
import { HabitatsComponent } from './components/habitats/habitats.component';
import { AnimauxComponent } from './animaux/animaux.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'veto', component: VetoComponent },
    { path: 'employe', component: EmployeComponent },
    { path: 'habitats', component: HabitatsComponent },
    { path: 'animaux', component: AnimauxComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
