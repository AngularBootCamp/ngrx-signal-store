import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WorkTask {
  id: number;
  title: string;
  description: string;
  responsibleParty: string;
  estimatedTime: number;
  priority: number;
}

const apiUrl = 'https://api.angularbootcamp.com';

@Injectable({
  providedIn: 'root'
})
export class WorkTaskLoader {
  constructor(private http: HttpClient) {}

  getList(): Observable<WorkTask[]> {
    return this.http.get<WorkTask[]>(apiUrl + '/worktasks');
  }
}
