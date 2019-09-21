import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent implements OnInit {
  @Input() survey: any;
  responseForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log(this.survey);
    this.initForm();
  }

  get f() {
    return this.responseForm.controls;
  }

  initForm() {
    this.responseForm = this.fb.group({
      responses: new FormArray([])
    });
    const responseArray = this.responseForm.controls.responses as FormArray;
    this.survey.surveyElements.forEach(element => {
      if (element.type === 'checkbox') {
        responseArray.push(this.createResponseForCheckbox(element));
      } else {
        responseArray.push(this.createResponse(element));
      }
    });
  }

  createResponse(element: any) {
    const reply = new FormControl('');
    // reply.setValidators(Validators.required); // for required cases, will be taken care of later
    return this.fb.group({
      name: new FormControl(element.name),
      reply
    });
  }

  createResponseForCheckbox(element: any) {
    return this.fb.group({
      name: new FormControl(element.name),
      reply: new FormGroup({})
    });
  }
}
