import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { VetoComponent } from './veto/veto.component';
import { EmployeComponent } from './employe/employe.component';
import { HabitatsComponent } from './components/habitats/habitats.component';
import { AnimauxComponent } from './animaux/animaux.component';
import { AnimalDetailComponent } from './animaldetails/animaldetails.component';
import { ZooservicesComponent } from './components/zooservices/zooservices.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'veto', component: VetoComponent },
    { path: 'employe', component: EmployeComponent },
    { path: 'habitats', component: HabitatsComponent },
    { path: 'animaux', component: AnimauxComponent },
    { path: 'zooservices', component: ZooservicesComponent },
    { path: 'animaldetails/:id', component: AnimalDetailComponent },
    { path: 'contact', component: ContactComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
