import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
  @Input() task: { title: string; description: string; } | undefined;

  constructor() {}

  editTask() {

  }

  confirmDelete() {

  }
}
