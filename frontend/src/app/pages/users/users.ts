import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  loadUsers(): void {
    this.loadingUsers = true;

    this.apiService.getUsers().subscribe({
      next: (data) => {
        console.log('Users received:', data);
        this.users = data;
        this.loadingUsers = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loadingUsers = false;
      }
    });
  }

  loadAllPosts(): void {
    this.errorMessage = '';

    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 50);

        this.modalTitle = 'All Posts';
        this.showModal = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error loading posts (No se pudo conectar con el servidor)';
      }
    });
  }

  loadPostsByUser(user: User): void {

    this.errorMessage = '';

    this.apiService.getPostsByUser(user.id).subscribe({
      next: (data) => {
        this.posts = data;
        this.modalTitle = `Posts by ${user.name}`;
        this.showModal = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error loading posts (No se pudo conectar con el servidor)';
      }
    });
  }

  simulateError(): void {
    this.errorMessage = '';

    this.apiService.simulateError().subscribe({
      next: () => {},
      error: (err) => {
        this.errorMessage = err.error;
        this.cdr.detectChanges();
      }

    });
  }

  closeModal(): void {
    this.showModal = false;
  }
}
