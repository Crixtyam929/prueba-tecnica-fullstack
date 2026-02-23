import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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
  showValidationModal: boolean = false;
  validationMessage: string = '';
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  /* =========================
     CARGAR PETICIONES
  ========================= */

  loadLogs(): void {
    this.apiService.getLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.errorMessage = 'No se pudo establecer conexión con el servidor.';
        } else {
          this.errorMessage = 'Error al cargar logs.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  /* =========================
     VALIDACIÓN MODAL
  ========================= */

  private showValidationError(message: string): void {
    this.validationMessage = message;
    this.showValidationModal = true;
    this.cdr.detectChanges();
  }

  closeValidationModal(): void {
    this.showValidationModal = false;
  }

  /* =========================
     CREAR REGISTRO
  ========================= */

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

    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    if (!this.selectedLog.httpMethod || !validMethods.includes(this.selectedLog.httpMethod)) {
      this.showValidationError('Debe seleccionar un método HTTP válido.');
      return;
    }

    if (!this.selectedLog.endpoint || !this.selectedLog.endpoint.startsWith('/')) {
      this.showValidationError('El endpoint debe iniciar con "/".');
      return;
    }

    if (
      !this.selectedLog.status ||
      this.selectedLog.status < 100 ||
      this.selectedLog.status > 599 ||
      this.selectedLog.status.toString().length !== 3
    ) {
      this.showValidationError('El código HTTP debe tener exactamente 3 dígitos (100–599).');
      return;
    }

    this.apiService.createLog(this.selectedLog).subscribe({
      next: () => {
        this.showCreateModal = false;
        this.loadLogs();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.showValidationError('No se pudo conectar con el servidor.');
        } else {
          this.showValidationError('Error al crear el log.');
        }
      }
    });
  }

  /* =========================
     EDITAR REGISTRO
  ========================= */

  openEdit(log: LogRequest): void {
    this.selectedLog = { ...log };
    this.showEditModal = true;
  }

  updateLog(): void {

    if (!this.selectedLog.id) return;

    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    if (!this.selectedLog.httpMethod || !validMethods.includes(this.selectedLog.httpMethod)) {
      this.showValidationError('Debe seleccionar un método HTTP válido.');
      return;
    }

    if (!this.selectedLog.endpoint || !this.selectedLog.endpoint.startsWith('/')) {
      this.showValidationError('El endpoint debe iniciar con "/".');
      return;
    }

    if (
      !this.selectedLog.status ||
      this.selectedLog.status < 100 ||
      this.selectedLog.status > 599 ||
      this.selectedLog.status.toString().length !== 3
    ) {
      this.showValidationError('El código HTTP debe tener exactamente 3 dígitos (100–599).');
      return;
    }

    this.apiService.updateLog(this.selectedLog.id, this.selectedLog).subscribe({
      next: () => {
        this.showEditModal = false;
        this.loadLogs();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.showValidationError('No se pudo conectar con el servidor.');
        } else {
          this.showValidationError('Error al actualizar el log.');
        }
      }
    });
  }

  /* =========================
     ELIMINAR REGISTRO
  ========================= */

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
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.showValidationError('No se pudo conectar con el servidor.');
        } else {
          this.showValidationError('Error al eliminar el log.');
        }
      }
    });
  }

  /* =========================
     CERRAR MODALES
  ========================= */

  closeModals(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showCreateModal = false;
  }
}
