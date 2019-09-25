import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  survey: any;
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `text`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/toolicons/text.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `select`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/toolicons/select.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `radio`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/toolicons/radio.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `boolean`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/toolicons/boolean.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `checkbox`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/toolicons/checkbox.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `slider`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/toolicons/slider.svg`)
    );
  }

  save(value) {
    this.survey = value;
  }
}
