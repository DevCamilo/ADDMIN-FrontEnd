import { Component, OnInit, Optional } from '@angular/core';
import { UserService } from '../../../providers/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../../providers/email.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  token = localStorage.getItem('token');
  userForm: FormGroup;
  loader: Boolean = false;
  constructor(private _user: UserService, private emailAPI: EmailService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      //telephone: ['', Validators.nullValidator],
      telephone: ['', Validators.required],
      tower: ['', Validators.required],
      apto: ['', Validators.required],
      typeUser: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  onSubmit() {
    this.loader = true;
    this.userForm.value.apto = this.userForm.value.apto.toString();
    this.userForm.value.tower = this.userForm.value.tower.toString();
    this.userForm.value.telephone = this.userForm.value.telephone.toString();
    this.userForm.value.typeUser = parseInt(this.userForm.value.typeUser);
    //console.log(this.userForm.value);
    this._user.createUserFunction(this.userForm.value, this.token).subscribe((res: any) => {
      //console.log(res);
      if (res.status) {
        //Swal.fire(res.message, '', 'success');
        this.emailAPI.sendWelcomeEmail({
          name: this.userForm.value.name,
          lastName: this.userForm.value.lastName,
          email: this.userForm.value.email
        }, this.token).subscribe((res2: any) => {
          if (res2.status) {
            Swal.fire(res2.message, '', 'success');
            this.userForm.reset();
            this.loader = false;
          } else {
            Swal.fire(res2.message, '', 'error');
            this.loader = false;
          }
        });
      } else {
        Swal.fire(res.message, '', 'error');
        this.loader = false;
      }
    });
  }

}
