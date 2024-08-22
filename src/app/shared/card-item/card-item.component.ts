import { Component, Input, Output,EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  @Input() task: { title: string; description: string } | undefined
  @Output() removeTask = new EventEmitter<any>();  

  constructor(private modalService: NgbModal) {}

  editTask() {}

  openDeleteModal(content: any) {
    this.modalService.open(content)
  }

  deleteTask() {
    this.removeTask.emit(this.task)
    this.modalService.dismissAll()
  }
}
