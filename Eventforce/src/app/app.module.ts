import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpModule } from '@angular/http';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { baseURL } from './shared/baseURL';


import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { EntryComponent } from './entry/entry.component';
import { LoginComponent } from './login/login.component';
import { LoginEmpComponent } from './login-emp/login-emp.component';
import { RegisterComponent } from './register/register.component';

import { StudentService } from './services/student.service';
import { EventService } from './services/event.service';
import { OrganizerService } from './services/organizer.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    EntryComponent,
    LoginComponent,
    LoginEmpComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule, 
    MatToolbarModule,
    MatTabsModule,
    HttpModule, 
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {provide: 'baseURL', useValue: baseURL},
    StudentService,
    EventService,
    OrganizerService,
    ProcessHTTPMsgService
  ],
  entryComponents: [LoginComponent, RegisterComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
