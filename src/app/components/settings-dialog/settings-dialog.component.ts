import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ValidateKey } from 'src/app/services/validators.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  formElement: FormGroup;
  type: string;
  optionsBased = ['checkbox', 'select', 'radio'];
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private ref: MatDialogRef<SettingsDialogComponent>) {
    this.formElement = data.formElement;
  }

  ngOnInit() {
    this.type = this.formElement.controls.type.value;
  }

  addPair() {
    const newGroup = this.fb.group({
      key: ['', [Validators.required, ValidateKey]],
      value: ['', Validators.required]
    });
    const options = this.formElement.controls.options as FormArray;
    options.push(newGroup);
  }

  deletePair(i: number) {
    const options = this.formElement.controls.options as FormArray;
    options.removeAt(i);
  }

  isOptions() {
    return this.optionsBased.includes(this.type);
  }

  close() {
    if (this.formElement.status === 'VALID') {
      this.ref.close();
    }
  }
}
