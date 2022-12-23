import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { clippingParents } from '@popperjs/core';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  public label: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.userService.activate(params['id']).subscribe(res => {
        console.log(res);
        this.label = res.message;
        this.goToLogin();
      });
    })
  }

  private goToLogin() {
    setTimeout(() =>{
      this.router.navigate(['/users/login']);
    },5000);
  }

}
