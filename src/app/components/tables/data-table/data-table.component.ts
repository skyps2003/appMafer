import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faArrowUpZA, faArrowDown, faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NgxPaginationModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent<T> {
  @Input() items: T[] = [];
  @Input() pageSize: number = 5;
  @Input() page: number = 1;
  @Input() columns: { key: keyof T; label: string; sortable?: boolean; type?: 'text' | 'image' }[] = [];
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faArrowUpZA = faArrowUpZA;
  faArrowDown = faArrowDown;
  faArrowDownAZ = faArrowDownAZ;

  onEdit(item: T): void {
    this.edit.emit(item);
  }

  onDelete(item: T): void {
    this.delete.emit(item);
  }
}
