import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(private auth: AuthService) {}
  
  ngOnInit() {
    const potencialToken = localStorage.getItem('auth-token');
    
    if (potencialToken != null) {
      this.auth.setToken(potencialToken);
    }
    
  }
}

