import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePostPageComponent } from './home-post-page/home-post-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PostFormComponent } from './post-form/post-form.component';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { Ng2ImgMaxService } from 'ng2-img-max';

@NgModule({
  declarations: [
    AppComponent,
    HomePostPageComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    PickerModule,
    ReactiveFormsModule,
    MatExpansionModule,
    NgxDropzoneModule,
    HttpClientModule,

  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
