import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LogRequest } from '../../models/log.model';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logs.html',
  styleUrls: ['./logs.css']
})
export class Logs implements OnInit {

  logs: LogRequest[] = [];
  selectedLog!: LogRequest;

  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showCreateModal: boolean = false;

  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.apiService.getLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error loading logs';
        this.cdr.detectChanges();
      }
    });
  }

  /* ===== CREATE ===== */

  openCreate(): void {
    this.selectedLog = {
      date: new Date().toISOString(),
      httpMethod: '',
      endpoint: '',
      status: 200,
      response: ''
    };
    this.showCreateModal = true;
  }

  createLog(): void {
    this.apiService.createLog(this.selectedLog).subscribe({
      next: () => {
        this.showCreateModal = false;
        this.loadLogs();
      }
    });
  }

  /* ===== EDIT ===== */

  openEdit(log: LogRequest): void {
    this.selectedLog = { ...log };
    this.showEditModal = true;
  }

  updateLog(): void {
    if (!this.selectedLog.id) return;

    this.apiService.updateLog(this.selectedLog.id, this.selectedLog).subscribe({
      next: () => {
        this.showEditModal = false;
        this.loadLogs();
      }
    });
  }

  /* ===== DELETE ===== */

  openDelete(log: LogRequest): void {
    this.selectedLog = log;
    this.showDeleteModal = true;
  }

  deleteLog(): void {
    if (!this.selectedLog.id) return;

    this.apiService.deleteLog(this.selectedLog.id).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.loadLogs();
      }
    });
  }

  closeModals(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showCreateModal = false;
  }
}
