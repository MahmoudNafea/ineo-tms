import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Task } from '../models/task.model'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.basicUrl + 'tasks')
  }

  createNewTask(task:Task) {
    return this.http.post(environment.basicUrl + 'tasks',task)
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(environment.basicUrl +`tasks/${task.id}`, task);
  }

  deleteTask(taskId: any): Observable<void> {
    return this.http.delete<void>(environment.basicUrl +`tasks/${taskId}`);
  }
}
