import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef: ElementRef | undefined;
  @ViewChild('sidenav') sidenavgRef: ElementRef | undefined;

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/orders', name: 'Заказы'},
    {url: '/users', name: 'Пользователи'},
    {url: '/location', name: 'Карта'},
    
  ]
  

  constructor(private auth: AuthService, private router: Router) { }

  ngAfterViewInit() {
    if (this.floatingRef != undefined) {
      MaterialService.initializeFloatingButton(this.floatingRef);
    }
    if (this.sidenavgRef != undefined) {
      MaterialService.initSidenav(this.sidenavgRef)
      
    }
  }
  
  logout(event: Event){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  openSidenav(event: Event){
    event.preventDefault()
    
    MaterialService.initSidenav(this.sidenavgRef).open()
  }
  closeSidenav(event: Event){
    event.preventDefault()
    MaterialService.initSidenav(this.sidenavgRef).close()
    MaterialService.initSidenav(this.sidenavgRef).destroy()
  }
}
