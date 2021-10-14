import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: [localStorage.getItem('user'), ''],
    password: [localStorage.getItem('password'), ''],
    remember: [localStorage.getItem('remember'),'']
  });
  hide = true;

  constructor(private authService:  AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Método para decodificar el token del usuario.
   * @param token 
   * @returns 
   */
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  /**
   * Método para loguearse en la aplicación.
   * Si el usuario activa la opción recuerdamé el método guarda los datos en el localstorage.
   */
  onLogin():void{
    const formValue = this.loginForm.value;
    this.authService.login(formValue).subscribe(res => {
    
      if(res.auth){   
        var decoded = this.getDecodedAccessToken(localStorage.getItem('accesstoken'));
        

        if (this.loginForm.get('remember').value) {
          localStorage.setItem('remember', "true");
          localStorage.setItem('user', this.loginForm.get('username').value);
          localStorage.setItem('password', this.loginForm.get('password').value);
        } 
        
        if (!this.loginForm.get('remember').value) {
          localStorage.removeItem('remember');
          localStorage.removeItem('user')
          localStorage.removeItem('password')
        }

        this.authService.setUser(decoded);

        this.router.navigate(['/in/events']);
        
        // if (this.authService.isAdmin) {
        //   this.router.navigate(['/dashboard/calendar']); 
        // } else {
        //   this.router.navigate(['/dashboard/job/list']); 
        // }    
      }
      
    })
  }
}

