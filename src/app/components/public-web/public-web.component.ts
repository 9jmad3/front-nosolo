import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-public-web',
  templateUrl: './public-web.component.html',
  styleUrls: ['./public-web.component.css']
})
export class PublicWebComponent implements OnInit {

  registerForm = this.fb.group({
    username: [, ''],
    password: [, ''],
    email: [,'']
  });
  hide = true;
  error = "";
  hidden = "hideError";

  constructor(private authService:  AuthService,
              private fb: FormBuilder,
              private route: Router,) { }

  ngOnInit(): void {
  }

  /**
   * Método para registrarse en la app
   */
   onRegister():void{
    const formValue = this.registerForm.value;
    this.authService.registerUser(formValue)
      .then(res => {
        setTimeout(() => {
          this.route.navigate(['']);
        }, 1000);
      })
      .catch(err => {
        let type = typeof(err.error);

        if (type == "string") {
          this.error = err.error;
        } else {
          this.error = err.error.errors;
        }
        this.hidden = "showError";
      })
  }
}