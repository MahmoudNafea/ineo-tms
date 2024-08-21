import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CardItemComponent } from '../../shared/card-item/card-item.component'
import { TaskService } from '../../services/task.service'
import { Task } from '../../models/task.model'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CardItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  tasks: Task[]=[]
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];


  constructor(private taskService:TaskService) {}

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks(){
    this.taskService.getTasks().subscribe((tasks:any) => {
      console.log("🚀 ~ DashboardComponent ~ this.taskService.getTasks ~ tasks:", tasks)
      this.tasks = tasks;
      this.toDoTasks = this.tasks.filter(task => task?.status === 'To Do');
      this.inProgressTasks = this.tasks.filter(task => task?.status === 'In Progress');
      this.doneTasks = this.tasks.filter(task => task?.status === 'Done');
    });
  }

  editTask() {
    // this.dialog.open(EditTaskDialog, {
    //   data: this.task
    // });
  }

  confirmDelete() {
    // const confirmDeleteDialog = this.dialog.open(ConfirmDeleteDialog);
    // confirmDeleteDialog.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Code to delete the task
    //   }
    // });
  }
}
