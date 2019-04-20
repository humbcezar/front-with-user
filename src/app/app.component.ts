import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {AuthenticateService} from './services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-with-user';

  constructor(private authenticateService: AuthenticateService) {
  }

  ngOnInit() {
    this.authenticateService.authenticate().subscribe();
  }

  logoff() {
    localStorage.clear();
    this.authenticateService.authenticate().subscribe();
  }
}
