import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService} from '../../services/user.service'
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private activatedRouter: ActivatedRoute, private userService: UserService) { 
    this.user= new User();
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params =>{
      if (typeof params ['id'] !== 'undefined'){
        this.user._id = params['id'];
      }
      else{
        this.user._id = '';
      }
    });
    this.getUsersDetail(this.user._id);
  }


getUsersDetail(_id: string){
  this.userService.getUsersDetail(_id)
  .subscribe(res =>{
    this.user = res;
    console.log(res);
    console.log(_id); 
    console.log(this.user);
  });
}

}
