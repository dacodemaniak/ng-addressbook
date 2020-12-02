import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public isLogged = false

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public getSubject(): BehaviorSubject<boolean> {
    return this.userService.loginStatusSubject$
  }
  
  public doLog(): void {
    this.isLogged = !this.isLogged
    if (this.isLogged) {
      this.userService.login()
    } else {
      this.userService.logout()
    }
  }

}
