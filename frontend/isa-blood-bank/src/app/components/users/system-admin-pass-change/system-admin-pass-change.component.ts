import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-system-admin-pass-change',
  templateUrl: './system-admin-pass-change.component.html',
  styleUrls: ['./system-admin-pass-change.component.css']
})
export class SystemAdminPassChangeComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';

  constructor(private userService: UsersService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  change() {
    if (this.password === this.confirmPassword &&
        this.password !== '' && this.confirmPassword !== '') {
      console.log('password ' + this.password);
      console.log('confirm ' + this.confirmPassword);
      let today = new Date();
      console.log('timestamp: ' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' ' +
        this.formatTime(today.getHours()) + ':' + this.formatTime(today.getMinutes()) + ':' + this.formatTime(today.getSeconds()));


      let timestamp = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' ' +
      this.formatTime(today.getHours()) + ':' + this.formatTime(today.getMinutes()) + ':' + this.formatTime(today.getSeconds());
      
      const token = localStorage.getItem('jwt');
      let decodedJWT;

      if (token != null) {
        decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      }

      // console.log('email:' + decodedJWT.sub);


      this.userService.findByEmail(decodedJWT.sub).subscribe((res: User) => {
        let user: User = res;
        user.password = this.password;
        user.lastPasswordResetDate = timestamp;
        this.userService.updatePassword(user).subscribe((response: User) => {
          console.log(response);
          this.router.navigate(['users/login']);
          this.authService.logout();
        });
      });
    }


  }

  formatTime(time: number): string {
    let timeString = time.toString();
    if (time < 10) {
      timeString = '0' + timeString;
    }
    
    return timeString;
  }

}
