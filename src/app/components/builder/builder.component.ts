import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';
import { ValidateKey } from 'src/app/services/validators.service';
import { PreviewFormComponent } from '../preview/preview-form/preview-form.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { JsonComponent } from '../json/json.component';
import { WorkspaceComponent } from '../workspace/workspace.component';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  @Input() surveyValue: any;
  @ViewChild(PreviewFormComponent, { static: false })
  private preview: PreviewFormComponent;
  @ViewChild(JsonComponent, { static: false })
  private jsonEditor: JsonComponent;
  @ViewChild(WorkspaceComponent, { static: false })
  private workspace: WorkspaceComponent;
  surveyForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.surveyForm = this.fb.group({
      surveyTitle: new FormControl('', Validators.required),
      surveyElements: new FormArray([])
    });
    this.initSurveyElements();
    if (this.surveyValue) {
      this.surveyForm.patchValue(this.surveyValue);
    }
  }

  initSurveyElements() {
    const se = this.surveyForm.controls.surveyElements as FormArray;
    if (this.surveyValue) {
      this.surveyValue.surveyElements.forEach(element => {
        if ('options' in element) {
          const question = this.createToolGroupForMultipleOptionType(
            element.type, element.options.length
          );
          se.push(question);
        } else if (element.type === 'slider') {
          const question = this.createToolGroupForSliderType(element.type);
          se.push(question);
        } else {
          const question = this.createToolGroupForSingleOptionType(
            element.type
          );
          se.push(question);
        }
      });
    }
  }

  createToolGroupForSliderType(type: string): FormGroup {
    return this.fb.group({
      name: new FormControl(this.getNewName(type), [Validators.required, ValidateKey]),
      question: new FormControl(`Enter your ${type} question here`, Validators.required),
      type: new FormControl(type, Validators.required),
      max: new FormControl('5', Validators.required),
      min: new FormControl('0', Validators.required),
      step: new FormControl('0.5', Validators.required),
      thumbLabel: new FormControl(true),
      inverted: new FormControl(false),
      maxmin: new FormControl(true)
    });
  }

  createToolGroupForSingleOptionType(type: string): FormGroup {
    return this.fb.group({
      name: new FormControl(this.getNewName(type), [
        Validators.required,
        ValidateKey
      ]),
      question: new FormControl(
        `Enter your ${type} question here`,
        Validators.required
      ),
      type: new FormControl(type, Validators.required)
    });
  }

  createToolGroupForMultipleOptionType(type: string, length: number): FormGroup {
    const options = new FormArray([]);
    for (let i = 1; i <= length; i++) {
      options.push(this.createOptionsInit(i));
    }
    return this.fb.group({
      name: new FormControl(this.getNewName(type), [
        Validators.required,
        ValidateKey
      ]),
      question: new FormControl(
        `Enter your ${type} question here`,
        Validators.required
      ),
      options,
      type: new FormControl(type, Validators.required)
    });
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

  get f() {
    return this.surveyForm.controls;
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (event.index === 0) {
      // this.workspace.ngOnInit();
    } else if (event.index === 1) {
      this.jsonEditor.init();
    } else if (event.index === 2) {
      this.preview.initForm();
    }
  }

  applyValue(value: string) {
    this.surveyValue = value;
    this.initForm();
  }
}
