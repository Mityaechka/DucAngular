import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user.entity';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  user: User;
  constructor(private authService: AuthService, private router: Router) {

  }
  async ngOnInit() {
    const response = await this.authService.getUser();
    if (response.isSuccess) {
      this.router.navigate(['till']);
    }else{
      this.router.navigate(['auth']);
    }
  }
}
