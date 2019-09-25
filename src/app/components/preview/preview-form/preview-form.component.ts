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
  result: any;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  get f() {
    return this.responseForm.controls;
  }

  initForm() {
    this.result = undefined;
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
      reply: new FormArray([])
    });
  }

  submit() {
    this.result = {};
    const replies = this.responseForm.value;
    console.log(1, replies);
    replies.responses.forEach(element => {
      if (element.reply && (!Array.isArray(element.reply) || element.reply.length > 0)) {
        this.result[element.name] = element.reply;
      }
    });
  }
}
