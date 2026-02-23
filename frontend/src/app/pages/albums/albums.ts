import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './albums.html',
  styleUrls: ['./albums.css']
})
export class Albums {

  userId!: number;
  albums: Album[] = [];
  errorMessage: string = '';
  searched: boolean = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  searchAlbums(): void {

    this.errorMessage = '';
    this.albums = [];
    this.searched = true;

    if (!this.userId || this.userId <= 0) {
      this.errorMessage = 'Please enter a valid user ID';
      this.cdr.detectChanges(); // 👈 importante
      return;
    }

    this.apiService.getAlbumsByUser(this.userId).subscribe({
      next: (data) => {
        this.albums = data;
        this.cdr.detectChanges(); // 👈 EXACTAMENTE como en users.ts
      },
      error: () => {
        this.errorMessage = 'Error loading albums';
        this.cdr.detectChanges(); // 👈 también aquí
      }
    });
  }
}
