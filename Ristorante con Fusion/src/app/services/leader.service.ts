import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():Leader[]
  {
    return LEADERS;
  }

  getFeaturedLeader():Leader
  {
    for(let i of LEADERS)
    {
      if(i.featured === true)
        return i;
    }
  }
}
