import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Survey } from 'src/app/models/survey.model';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  opened = true;
  surveyForm: FormGroup;

  @Input() surveyValue: Survey;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.surveyValue = {
      surveyTitle: 'Okay',
      surveyElements: [{
        question: 'haha is the question',
        type: 'text'
      }, {
        question: 'haha',
        type: 'checkbox'
      }]
    };
    this.initForm();
  }

  get f() {
    return this.surveyForm.controls;
  }

  initForm() {
    this.surveyForm = this.fb.group({
      surveyTitle: new FormControl(''),
      surveyElements: new FormArray([])
    });
    this.initSurveyElements();
    this.surveyForm.patchValue(this.surveyValue);
  }

  initSurveyElements() {
    const se = this.surveyForm.controls.surveyElements as FormArray;
    this.surveyValue.surveyElements.forEach(element => {
      if (element.choices === undefined) {
        const question = this.createToolGroupForSingleOptionType(element.type);
        se.push(question);
      } else {
        const question = this.createToolGroupForSingleOptionType(element.type);
        se.push(question);
      }
    });
  }

  createToolGroupForSingleOptionType(type: string): FormGroup {
    return this.fb.group({
      question: new FormControl(''),
      type: new FormControl(type)
    });
  }

  createToolGroupForMultipleOptionType(type: string): FormGroup {
    return this.fb.group({
      question: new FormControl(''),
      options: new FormArray([]),
      type: new FormControl(type)
    });
  }
}
