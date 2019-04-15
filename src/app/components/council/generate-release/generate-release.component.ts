import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-generate-release',
  templateUrl: './generate-release.component.html',
  styleUrls: ['./generate-release.component.css']
})
export class GenerateReleaseComponent implements OnInit {
  editForm: FormGroup
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      'editor': Validators.required
    });
  }

}
