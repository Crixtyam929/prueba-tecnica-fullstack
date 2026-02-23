import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album.model';
import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './albums.html',
  styleUrls: ['./albums.css']
})
export class Albums implements OnInit {

  users: User[] = [];
  selectedUserId!: number;

  albums: Album[] = [];
  errorMessage: string = '';
  searched: boolean = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  /* =========================
     CARGAR USUARIOS AL INICIAR
  ========================= */

  ngOnInit(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.errorMessage = 'No se pudo establecer conexión con el servidor.';
        } else {
          this.errorMessage = 'Error al cargar usuarios.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  /* =========================
     BUSCAR ÁLBUMES POR USUARIO
  ========================= */

  searchAlbums(): void {

    this.errorMessage = '';
    this.albums = [];
    this.searched = true;

    if (!this.selectedUserId) {
      this.errorMessage = 'Debe seleccionar un usuario.';
      this.cdr.detectChanges();
      return;
    }

    this.apiService.getAlbumsByUser(this.selectedUserId).subscribe({
      next: (data) => {
        this.albums = data;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.errorMessage = 'No se pudo establecer conexión con el servidor.';
        } else {
          this.errorMessage = 'Error al cargar los álbumes.';
        }
        this.cdr.detectChanges();
      }
    });
  }
}
