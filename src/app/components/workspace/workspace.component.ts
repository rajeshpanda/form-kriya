import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  AbstractControl,
  Validators
} from '@angular/forms';
import { Survey } from 'src/app/models/survey.model';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { ValidateKey } from 'src/app/services/validators.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  opened = true;
  surveyForm: FormGroup;

  @Input() surveyValue: Survey;
  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.surveyValue = {
      surveyTitle: 'Okay',
      surveyElements: [
        {
          question: 'haha is the question',
          type: 'text'
        },
        {
          question: 'haha',
          type: 'checkbox',
          options: []
        }
      ]
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
      if ('options' in element) {
        const question = this.createToolGroupForMultipleOptionType(
          element.type
        );
        se.push(question);
      } else {
        const question = this.createToolGroupForSingleOptionType(element.type);
        se.push(question);
      }
    });
  }

  createToolGroupForSingleOptionType(type: string): FormGroup {
    return this.fb.group({
      name: new FormControl(this.getNewName(type), Validators.required),
      question: new FormControl('', Validators.required),
      type: new FormControl(type, Validators.required)
    });
  }

  createToolGroupForMultipleOptionType(type: string): FormGroup {
    const options = new FormArray([]);
    for (let i = 1; i <= 3; i++) {
      options.push(this.createOptionsInit(i));
    }
    return this.fb.group({
      name: new FormControl(this.getNewName(type), Validators.required),
      question: new FormControl('', Validators.required),
      options,
      type: new FormControl(type, Validators.required)
    });
  }

  openSettings(formElement: FormGroup) {
    this.dialog.open(SettingsDialogComponent, {
      width: '50%',
      disableClose: true,
      data: {
        formElement
      }
    });
  }

  deleteQuestion(i: number) {
    const questions = this.f.surveyElements as FormArray;
    questions.removeAt(i);
  }

  createOptionsInit(i: number) {
    return this.fb.group({
      key: ['option' + i, [Validators.required, ValidateKey]],
      value: ['Option ' + i, [Validators.required]]
    });
  }

  getNewName(type: string) {
    return `${type}${(this.f.surveyElements as FormArray).length + 1}`;
  }
}
