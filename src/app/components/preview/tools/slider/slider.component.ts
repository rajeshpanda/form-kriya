import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class PreviewSliderComponent implements OnInit {
  @Input() formElement: FormGroup;
  @Input() question: any;
  constructor() { }

  ngOnInit() {
  }

}
