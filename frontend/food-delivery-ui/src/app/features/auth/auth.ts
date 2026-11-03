import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Login } from './login/login';
import { RegisterAccount } from './register-account/register-account';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatTabsModule,Login,RegisterAccount,MatIconModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  selectedTabIndex = 0;

  isLoginButtonClicked(request : boolean):void {
    if(request){
      this.selectedTabIndex = 0;
    }
  }

  isRegisterButtonClicked(request:boolean):void {
    if(request){
      this.selectedTabIndex = 1;
    }
  }
}
