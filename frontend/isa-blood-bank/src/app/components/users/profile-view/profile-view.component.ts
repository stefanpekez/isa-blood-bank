import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
  providers: [UsersService]
})
export class ProfileViewComponent implements OnInit {

  editStatus: boolean = true;
  userObject: User = {} as User;
  userType: boolean = true;
  oldPassword: string = '';
  newPassword: string = '';
  genderSelect = ["MALE", "FEMALE"];
  workStatusSelect = ['SCHOOL', 'UNIVERSITY', 'WORK'];

  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.usersService.getUser(params['id'])
      .subscribe((response:any) =>{
        this.userObject = response;
        this.checkRole();
      });
    })

  }

  enableEdit(){
    this.editStatus = false;
  }


  checkRole(){
    if(this.userObject.role != "REGULAR"){
      this.userType = false;
    }
  }

  checkPassword(){
    if(this.oldPassword == this.userObject.password){
      this.userObject.password = this.newPassword;
      this.saveChanges();
      this.clearPassword();
      alert('New password is set!')
    }else{
      alert('Password verification failed! Please check input');
      this.clearPassword();
    }
  }

  clearPassword(){
    this.oldPassword = '';
    this.newPassword = '';
  }

  update(e:any){
    alert(this.userObject.gender);
  }

  public saveChanges(){
    //event.preventDefault();
    this.usersService.updateUser(this.userObject)
      .subscribe((response: any) =>{
          window.location.reload();
      });
  }


}
