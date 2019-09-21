import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-preview-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class PreviewCheckboxComponent {
  @Input() formElement: FormGroup;
  @Input() question: any;
  constructor() {}

  onChange(event: MatCheckboxChange) {
    const reply = this.formElement.get('reply') as FormArray;
    if (event.checked) {
      reply.push(new FormControl(event.source.value));
    } else {
      const i = reply.controls.findIndex(x => x.value === event.source.value);
      reply.removeAt(i);
    }
  }
}
