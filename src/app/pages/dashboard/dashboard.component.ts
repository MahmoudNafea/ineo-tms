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

  getAllTasks() {
    this.isLoading = true
    this.taskService
      .getTasks()
      .pipe(delay(3000)) // Delay for 3 seconds
      .subscribe((tasks: any) => {
        this.tasks = tasks
        this.toDoTasks = this.tasks.filter((task) => task?.status === 'To Do')
        this.inProgressTasks = this.tasks.filter(
          (task) => task?.status === 'In Progress',
        )
        this.doneTasks = this.tasks.filter((task) => task?.status === 'Done')
        this.isLoading = false
      })
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

  openModal(content: any) {
    this.modalService.open(content)
    // .result.then(
    //   (result) => {
    //     // Handle close result if needed
    //   },
    //   (reason) => {
    //     // Handle dismiss reason if needed
    //   },
    // )
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
