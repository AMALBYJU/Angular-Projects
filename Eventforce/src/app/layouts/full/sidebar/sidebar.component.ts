import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../classes/student';
import { OrganizerService } from '../../../services/organizer.service';
import { Organizer } from '../../../classes/organizer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent {

  mobileQuery: MediaQueryList;
  user_name:string;
  org_or_student:boolean;    // false - organizer, true - student
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, public menuItems: MenuItems,
    private studentService:StudentService,
    private organizerService:OrganizerService) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.org_or_student = false;
  }

  ngOnInit()
  {
    if(this.studentService.getCurStudent() == null)
    {
      this.user_name = this.organizerService.getCurOrganizer().name;
      this.org_or_student = false;
    }
    else
    {
      this.user_name = this.studentService.getCurStudent().name;
      this.org_or_student = true;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toDisplay(menuitem:any)
  {

    if(this.org_or_student == false)
    {
      if(menuitem.name == 'Selected Events')
        return false;
      else
        return true;
    }
    else
    {
      if(menuitem.name == 'Participants' || menuitem.name == 'Event Registration')
      {
        return false;
      }
    }
    return true;
  }
 
}