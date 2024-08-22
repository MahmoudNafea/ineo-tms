import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Task, TaskStatus } from '../../models/task.model'

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent implements OnInit {
  @Input() task: Task | undefined
  @Output() removeTask = new EventEmitter<any>()
  @Output() updateTask = new EventEmitter<any>()

  editTaskForm: FormGroup

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.editTaskForm = this.fb.group({
      id: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      status: [null, Validators.required],
    })
  }

  ngOnInit() {
    this.patchTaskValue(this.task)
  }

  patchTaskValue(task: any) {
    if (task) {
      this.editTaskForm.setValue({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      })
    }
  }

  openEditTaskModal(event:any,content: any) {
    event.stopPropagation(); // Prevent triggering the parent click event
    this.modalService.open(content)
  }

  openDeleteModal(content: any) {
    this.modalService.open(content)
  }

  openDetailsModal(content: any) {
    this.modalService.open(content)

  }

  deleteTask() {
    this.removeTask.emit(this.task)
    this.modalService.dismissAll()
  }
  saveTask() {
    const { valid, value } = this.editTaskForm
    if (valid) {
      this.updateTask.emit(value)
      this.modalService.dismissAll()
    }
  }

  get taskStatuses(): string[] {
    return Object.values(TaskStatus)
  }
}
