import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
    {state: 'starter', name: 'Starter Page', type: 'link', icon: 'av_timer' },
    /* {state: 'button', type: 'link', name: 'Competition', icon: 'crop_7_5'}, */
    {state: 'grid', type: 'link', name: 'Event Registration', icon: 'view_comfy'},
    {state: 'lists', type: 'link', name: 'Profile', icon: 'view_list'},
    {state: 'menu', type: 'link', name: 'View Events', icon: 'view_headline'},
    /* {state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab'}, */
    {state: 'stepper', type: 'link', name: 'Participants', icon: 'web'},
    {state: 'expansion', type: 'link', name: 'Selected Events', icon: 'vertical_align_center'}
   /*  {state: 'chips', type: 'link', name: 'Chips', icon: 'vignette'},
    {state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail'},
    {state: 'progress-snipper', type: 'link', name: 'Progress snipper', icon: 'border_horizontal'},
    {state: 'progress', type: 'link', name: 'Progress Bar', icon: 'blur_circular'},
    {state: 'dialog', type: 'link', name: 'Dialog', icon: 'assignment_turned_in'},
    {state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant'},
    {state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb'},
    {state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode'},
    {state: 'slide-toggle', type: 'link', name: 'Slide Toggle', icon: 'all_inclusive'},  */
    
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
