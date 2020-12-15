import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  aSub!: Subscription
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

      }

  ngOnInit(): void {
    this.form = new FormGroup({
      tel: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{11}")]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered'] == true) {
        MaterialService.toast('Добро пожаловать', 'yellow black-text');
      } else if (params['accessDenied'] == true) {
        MaterialService.toast('Вы не авторизованы', 'red black-text');
      } else if (params['sessionFailed']  == true) {
        MaterialService.toast('Необходимо аторизоваться снова', 'red black-text');
      }
    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message, 'red black-text')
  
        this.form.enable()
      }
    )
  }

}
