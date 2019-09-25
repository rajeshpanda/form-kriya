import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class PreviewBooleanComponent implements OnInit {
  @Input() formElement: FormGroup;
  @Input() question: any;
  constructor() { }

  ngOnInit() {
  }

}
