import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { Donator } from '../shared/donator.model';
import { Address } from 'src/app/shared/address.model';

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
  donatorObject : Donator = {} as Donator;
  loyaltyStatus: boolean = true;
  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userObject.address = {} as Address;
    this.route.params.subscribe((params: Params)=> {
      this.usersService.getUser(params['id'])
      .subscribe((response:User) =>{
        this.userObject = response;
        this.checkRole();
      });
    })
  }

  enableEdit(){
    this.editStatus = false;
  }


  checkRole(){
    // if(this.userObject.role != "REGULAR"){
    //   this.userType = false;
    // }else{
      this.showDonatorInfo();
    // }
  }

  checkPassword(){
    if(this.oldPassword == this.userObject.password){
      this.userObject.password = this.newPassword;
      this.saveChanges();
      alert('New password is set!')
    }else{
      alert('Password verification failed! Please check input');
    }
    
    this.clearPassword();
  }

  clearPassword(){
    this.oldPassword = '';
    this.newPassword = '';
  }

  update(e:any){
    alert(this.userObject.gender);
  }

  public saveChanges(){
    this.usersService.updateUser(this.userObject)
      .subscribe((response: User) =>{
          window.location.reload();
      });
  }

  public showDonatorInfo(){
    this.route.params.subscribe((params: Params)=> {
      this.usersService.getDonator(params['id'])
      .subscribe((response:Donator) =>{
        this.donatorObject = response;
        if(this.donatorObject != null){
          this.loyaltyStatus = false;
        }
      });
    })
  }
}
