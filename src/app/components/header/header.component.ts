import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Role } from '../../../models/role.model';
import { AuthService } from '../../services/Authservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  currentUser: Role | null;
  title = 'ZooArcadia';

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = null;
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  toggleIcon(toggler: string) {
    const icon = document.querySelector(`.${toggler}`);
    if (icon) {
      icon.classList.toggle('open');
    }


    const navbarContent = document.getElementById('navbarToggleExternalContent10');
    if (navbarContent) {
      navbarContent.classList.toggle('show');
    }
  }
}



