import { CommonModule } from '@angular/common'
import { Component, ViewChild } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { CardItemComponent } from '../../shared/card-item/card-item.component'
import { TaskService } from '../../services/task.service'
import { Task, TaskStatus } from '../../models/task.model'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { catchError, delay, of } from 'rxjs'
import { ToastComponent } from '../../shared/toast/toast.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardItemComponent,
    ReactiveFormsModule,
    ToastComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  tasks: Task[] = []
  toDoTasks: Task[] = []
  inProgressTasks: Task[] = []
  doneTasks: Task[] = []

  createTaskForm: FormGroup
  showSpinner = false
  isLoading = false
  sortAscending: boolean = true;
  isInProgressAscending = true;
  isDoneAscending = true;

  @ViewChild(ToastComponent) toastComponent!: ToastComponent

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
    this.createTaskForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      status: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllTasks()
  }

  sortToDoTasks() {
    this.sortAscending = !this.sortAscending;
    this.toDoTasks.sort((a, b) => {
      const dateA = new Date(a?.createdAt).getTime();
      const dateB = new Date(b?.createdAt).getTime();
      return this.sortAscending ? dateA - dateB : dateB - dateA;
    });
  }

  sortInProgressTasks() {
    this.isInProgressAscending = !this.isInProgressAscending;
    this.inProgressTasks.sort((a, b) => {
      return this.isInProgressAscending
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  
  sortDoneTasks() {
    this.isDoneAscending = !this.isDoneAscending;
    this.doneTasks.sort((a, b) => {
      return this.isDoneAscending
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  getAllTasks() {
    this.isLoading = true
    this.taskService
      .getTasks()
      .pipe(delay(2000)) // Delay for 3 seconds
      .subscribe((tasks: any) => {
        this.tasks = tasks
        this.toDoTasks = this.tasks.filter(
          (task) => task?.status === TaskStatus.ToDo,
        )
        this.inProgressTasks = this.tasks.filter(
          (task) => task?.status === TaskStatus.InProgress,
        )
        this.doneTasks = this.tasks.filter(
          (task) => task?.status === TaskStatus.Done,
        )
        this.isLoading = false
      })
  }

 updateAllTasks() {
    this.taskService
      .getTasks()
      .subscribe((tasks: any) => {
        this.tasks = tasks
        this.toDoTasks = this.tasks.filter(
          (task) => task?.status === TaskStatus.ToDo,
        )
        this.inProgressTasks = this.tasks.filter(
          (task) => task?.status === TaskStatus.InProgress,
        )
        this.doneTasks = this.tasks.filter(
          (task) => task?.status === TaskStatus.Done,
        )
      })
  }

  editTask() {
    // this.dialog.open(EditTaskDialog, {
    //   data: this.task
    // });
  }

  confirmDeleteTask(task: Task) {
    this.taskService
      .deleteTask(task?.id)
      .pipe(
        catchError((error) => {
          this.toastComponent.show(`${error?.message}`, 'error')
          return of(null)
        }),
      )
      .subscribe((data: any) => {
        this.toastComponent.show(
          `${data?.title} deleted successfully`,
          'success',
        )
        this.updateAllTasks()
      })
  }

  confirmUpdateTask(task:Task){
    this.taskService
    .updateTask(task)
    .pipe(
      catchError((error) => {
        this.toastComponent.show(`${error?.message}`, 'error')
        return of(null)
      }),
    )
    .subscribe((data: any) => {
      this.toastComponent.show(
        `${data?.title} updated successfully`,
        'success',
      )
      this.updateAllTasks()
    })
  }

  openModal(content: any) {
    this.modalService.open(content)
  }

  addNewTask(form: FormGroup, modal: any) {
    const { valid, value } = form
    if (valid) {
      this.showSpinner = true
      this.taskService
        .createNewTask(value)
        .pipe(
          delay(2000),
          catchError((error) => {
            this.showSpinner = false
            this.toastComponent.show(`${error?.message}`, 'error')
            return of(null)
          }),
        )
        .subscribe((data: any) => {
          this.showSpinner = false

          this.toastComponent.show(
            `${data?.title} created successfully`,
            'success',
          )

          modal.close('Task created')
          this.getAllTasks()
        })
    }
  }

  get taskStatuses(): string[] {
    return Object.values(TaskStatus)
  }
}
