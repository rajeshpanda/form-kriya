import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class PreviewSelectComponent implements OnInit {
  @Input() formElement: FormGroup;
  @Input() question: any;
  constructor() { }

  ngOnInit() {
  }

}
