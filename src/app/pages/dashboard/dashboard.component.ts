import { CommonModule } from '@angular/common'
import { Component, ViewChild } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CardItemComponent } from '../../shared/card-item/card-item.component'
import { TaskService } from '../../services/task.service'
import { Task } from '../../models/task.model'
// import bootstrap from '../../../main.server'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CardItemComponent,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  tasks: Task[]=[]
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];


  constructor(private taskService:TaskService,
    private modalService: NgbModal,

  ) {}

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

  openCreateTaskDialog(): void {
    // Code to open dialog for creating a new task

  }

  openModal(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        // Handle close result if needed
      },
      (reason) => {
        // Handle dismiss reason if needed
      }
    );
  }

  addTask(newTask: any) {
    // this.taskService.addTask(newTask).subscribe(() => {
    //   this.loadTasks(); // Reload tasks after adding a new one
    // });
  }

  // openTaskModal() {
  //   this.createTaskDialogComponent.openModal();
  // }
}
