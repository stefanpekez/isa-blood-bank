import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users/shared/users.service';
import { UserDTO } from './shared/userDTO.model';

@Component({
  selector: 'app-donators',
  templateUrl: './donators.component.html',
  styleUrls: ['./donators.component.css']
})
export class DonatorsComponent implements OnInit {
  userDtos: UserDTO[] = [];

  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.usersService.getAllDonators(params['id'])
      .subscribe((response: UserDTO[] ) => {
        this.userDtos = response;
      });
    })
  }

  public sortUserDtos(param: string, type: string) {
    if (param === 'name' && type === 'asc')
      this.userDtos = this.userDtos.sort((a, b) => a.name.localeCompare(b.name));
    if (param === 'name' && type === 'desc')
      this.userDtos = this.userDtos.sort((a, b) => -1 * a.name.localeCompare(b.name));
    if (param === 'lastName' && type === 'asc')
      this.userDtos = this.userDtos.sort((a, b) => a.lastName.localeCompare(b.lastName));
    if (param === 'lastName' && type === 'desc')
      this.userDtos = this.userDtos.sort((a, b) => -1 * a.lastName.localeCompare(b.lastName));
    if (param === 'date' && type === 'asc') {
      this.userDtos = this.userDtos.sort((a, b) => {
        let dateArray = a.donationDate.slice(0,3);
        const newDate = new Date(Number(dateArray[0]), Number(dateArray[1]), Number(dateArray[2]));
        dateArray = b.donationDate.slice(0,3);
        const newDate2 = new Date(Number(dateArray[0]), Number(dateArray[1]), Number(dateArray[2]));
        return newDate.getTime() - newDate2.getTime();
      });
    }
      
    if (param === 'date' && type === 'desc') {
      this.userDtos = this.userDtos.sort((a, b) => {
        let dateArray = a.donationDate.slice(0,3);
        const newDate = new Date(Number(dateArray[0]), Number(dateArray[1]), Number(dateArray[2]));
        dateArray = b.donationDate.slice(0,3);
        const newDate2 = new Date(Number(dateArray[0]), Number(dateArray[1]), Number(dateArray[2]));
        return newDate2.getTime() - newDate.getTime();
      });
    }
  }

}
