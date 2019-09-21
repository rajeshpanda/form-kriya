import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { TextComponent } from './components/tools/text/text.component';
import { CheckboxComponent } from './components/tools/checkbox/checkbox.component';
import { SelectComponent } from './components/tools/select/select.component';
import { RadioComponent } from './components/tools/radio/radio.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { BooleanComponent } from './components/tools/boolean/boolean.component';
import { PreviewFormComponent } from './components/preview-form/preview-form.component';
import { PreviewTextComponent } from './components/preview/text/text.component';
import { PreviewSelectComponent } from './components/preview/select/select.component';
import { PreviewRadioComponent } from './components/preview/radio/radio.component';
import { PreviewCheckboxComponent } from './components/preview/checkbox/checkbox.component';
import { PreviewBooleanComponent } from './components/preview/boolean/boolean.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    ToolboxComponent,
    TextComponent,
    CheckboxComponent,
    SelectComponent,
    RadioComponent,
    SettingsDialogComponent,
    BooleanComponent,
    PreviewFormComponent,
    PreviewTextComponent,
    PreviewSelectComponent,
    PreviewRadioComponent,
    PreviewCheckboxComponent,
    PreviewBooleanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [SettingsDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
