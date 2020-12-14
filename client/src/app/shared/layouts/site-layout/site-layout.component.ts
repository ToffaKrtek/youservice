import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {
  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/orders', name: 'Заказы'},
    {url: '/users', name: 'Пользователи'},
    {url: '/location', name: 'Карта'},
    
  ]
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  logout(event: Event){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
