import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CardItemComponent } from '../../shared/card-item/card-item.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CardItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // todoTasks = [
  //   { name: 'Task 1',desc:'descsjk' },
  //   { name: 'Task 2',desc:'descsjk' },
  //   { name: 'Task 3',desc:'descsjk' }
  // ];

  // inProgressTasks = [
  //   { name: 'Task 4' },
  //   { name: 'Task 5' }
  // ];

  // doneTasks = [
  //   { name: 'Task 6' },
  //   { name: 'Task 7' }
  // ];

  taskColumns = [
    {
      name: 'To Do',
      tasks: [
        { title: 'Task 1', description: 'Task 1 description' },
        { title: 'Task 1', description: 'Task 1 description' },
        { title: 'Task 1', description: 'Task 1 description' },
      ],
    },
    {
      name: 'In Progress',
      tasks: [
        { title: 'Task 2', description: 'Task 2 description' },
        { title: 'Task 1', description: 'Task 1 description' },
        { title: 'Task 1', description: 'Task 1 description' },
      ],
    },
    {
      name: 'Done',
      tasks: [
        { title: 'Task 3', description: 'Task 3 description' },
        { title: 'Task 1', description: 'Task 1 description' },
        { title: 'Task 1', description: 'Task 1 description' },
      ],
    },
  ]

  constructor() {}

  ngOnInit(): void {}

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
