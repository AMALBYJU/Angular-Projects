import { Comment } from './comment';

export class Event
{
    id:number;
    name: string;
    club: string;
    venue: string;
    image: string;
    category: string;
    org_desc: string;    // Organizer description -- about club that hosts the event
    event_desc: string;  // Event description
    date: Date;
    start_time: string;
    end_time: string;
    max_registrations: number;
    cur_registrations: number;
    comments: Comment[];
    students_id:number[];
}