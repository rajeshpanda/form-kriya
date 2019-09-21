import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Survey } from 'src/app/models/survey.model';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { ValidateKey } from 'src/app/services/validators.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  opened = true;
  surveyForm: FormGroup;
  mobile = false;
  openMode = 'side';
  @Input() surveyValue: Survey;
  @Output() survey = new EventEmitter<string>();
  optionsBased = ['checkbox', 'select', 'radio'];
  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    if (window.screen.width < window.screen.height) { // 768px portrait
      this.mobile = true;
      this.openMode = 'push';
      this.opened = false;
    }
    this.initForm();
  }

  get f() {
    return this.surveyForm.controls;
  }

  initForm() {
    this.surveyForm = this.fb.group({
      surveyTitle: new FormControl('', Validators.required),
      surveyElements: new FormArray([])
    });
    this.initSurveyElements();
    // this.surveyForm.patchValue(this.surveyValue);
  }

  initSurveyElements() {
    const se = this.surveyForm.controls.surveyElements as FormArray;
    if (this.surveyValue) {
      this.surveyValue.surveyElements.forEach(element => {
        if ('options' in element) {
          const question = this.createToolGroupForMultipleOptionType(element.type);
          se.push(question);
        } else {
          const question = this.createToolGroupForSingleOptionType(element.type);
          se.push(question);
        }
      });
    }
  }

  createToolGroupForSingleOptionType(type: string): FormGroup {
    return this.fb.group({
      name: new FormControl(this.getNewName(type), [Validators.required, ValidateKey]),
      question: new FormControl(`Enter your ${type} question here`, Validators.required),
      type: new FormControl(type, Validators.required)
    });
  }

  createToolGroupForMultipleOptionType(type: string): FormGroup {
    const options = new FormArray([]);
    for (let i = 1; i <= 3; i++) {
      options.push(this.createOptionsInit(i));
    }
    return this.fb.group({
      name: new FormControl(this.getNewName(type), [Validators.required, ValidateKey]),
      question: new FormControl(`Enter your ${type} question here`, Validators.required),
      options,
      type: new FormControl(type, Validators.required)
    });
  }

  openSettings(formElement: FormGroup) {
    if (!formElement.controls.question.value) {
      formElement.controls.question.setValue(`Enter your ${formElement.controls.type.value} question here`);
    }
    this.dialog.open(SettingsDialogComponent, {
      width: '90%',
      maxWidth: '800px',
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

  drop(event: CdkDragDrop<string[]>) {
    const questions = this.f.surveyElements as FormArray;
    const selected = questions.at(event.previousIndex);
    questions.removeAt(event.previousIndex);
    questions.insert(event.currentIndex, selected);
  }

  isOptions(type: string) {
    return this.optionsBased.includes(type);
  }

  addNewTool(type: string) {
    const se = this.surveyForm.controls.surveyElements as FormArray;
    if (this.isOptions(type)) {
      const question = this.createToolGroupForMultipleOptionType(type);
      se.push(question);
    } else {
      const question = this.createToolGroupForSingleOptionType(type);
      se.push(question);
    }
  }

  isEmptyArray() {
    return (this.surveyForm.controls.surveyElements as FormArray).length === 0;
  }

  disableSend(): boolean {
    return !(this.surveyForm.status === 'VALID' && !this.isEmptyArray());
  }

  send() {
    if (this.surveyForm.status === 'VALID' && !this.isEmptyArray()) {
      this.survey.next(this.surveyForm.value);
    } else {
      alert('error occured');
    }
  }
}
