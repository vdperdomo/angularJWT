import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  
  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }
  

  login() {

    // TODO: Hash the password
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe(
        response => {
          this.router.navigate(['/']);
        },
        error => {
          this.openDialog();
        }
      )
    }
  }

  openDialog(): void {
    this.dialog.open(ErrorModalComponent, {
      width: '250px',
    });

  }

}
