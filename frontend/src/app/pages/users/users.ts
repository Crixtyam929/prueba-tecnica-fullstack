import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { Post } from '../../models/posts.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users {

  users: User[] = [];
  posts: Post[] = [];

  errorMessage: string = '';

  showModal: boolean = false;
  modalTitle: string = '';

  loadingUsers: boolean = false;
  loadingPosts: boolean = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  /* =========================
     CARGAR USUARIOS
  ========================= */

  loadUsers(): void {

    if (this.loadingUsers) return;

    this.errorMessage = '';
    this.loadingUsers = true;
    this.users = [];

    this.cdr.detectChanges();

    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loadingUsers = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {

        this.loadingUsers = false;

        if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        } else {
          this.errorMessage = 'Error al cargar usuarios.';
        }

        this.cdr.detectChanges();
      }
    });
  }

  /* =========================
     CARGAR TODOS LOS POSTS
  ========================= */

  loadAllPosts(): void {

    if (this.loadingPosts) return;

    this.errorMessage = '';
    this.loadingPosts = true;

    this.cdr.detectChanges();

    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 50);
        this.modalTitle = 'All Posts';
        this.showModal = true;
        this.loadingPosts = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {

        this.loadingPosts = false;

        if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        } else {
          this.errorMessage = 'Error al cargar posts.';
        }

        this.cdr.detectChanges();
      }
    });
  }

  /* =========================
     CARGAR POSTS POR USUARIO
  ========================= */

  loadPostsByUser(user: User): void {

    if (this.loadingPosts) return;

    this.errorMessage = '';
    this.loadingPosts = true;

    this.cdr.detectChanges();

    this.apiService.getPostsByUser(user.id).subscribe({
      next: (data) => {
        this.posts = data;
        this.modalTitle = `Posts by ${user.name}`;
        this.showModal = true;
        this.loadingPosts = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {

        this.loadingPosts = false;

        if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        } else {
          this.errorMessage = 'Error al cargar los posts del usuario.';
        }

        this.cdr.detectChanges();
      }
    });
  }

  /* =========================
     SIMULAR ERROR
  ========================= */

  simulateError(): void {

    this.errorMessage = '';
    this.cdr.detectChanges();

    this.apiService.simulateError().subscribe({
      next: () => {},
      error: (err: HttpErrorResponse) => {

        if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        } else {
          this.errorMessage = err.error || 'Se produjo un error simulado.';
        }

        this.cdr.detectChanges();
      }
    });
  }

  /* =========================
     CERRAR MODAL
  ========================= */

  closeModal(): void {
    this.showModal = false;
    this.cdr.detectChanges();
  }
}
