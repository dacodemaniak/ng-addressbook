import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public connectedStatus: boolean = false

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.loginStatusSubject$.subscribe((loginStatus: boolean) => {
      console.log(`Got ${loginStatus ? 'Connected' : 'Disconnected'}`)
      this.connectedStatus = loginStatus
    })
  }

}
