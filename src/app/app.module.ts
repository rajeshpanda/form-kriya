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
import { TitleComponent } from './components/title/title.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    ToolboxComponent,
    TextComponent,
    CheckboxComponent,
    SelectComponent,
    RadioComponent,
    TitleComponent,
    SettingsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  entryComponents: [SettingsDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
