import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AdminUser,
  AdminUserService
} from '../../shared/services/admin-user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: AdminUser[] = [];
  searchText = '';
  isLoading = false;

  constructor(private userService: AdminUserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  get filteredUsers(): AdminUser[] {
    const search = this.searchText.trim().toLowerCase();

    if (!search) return this.users;

    return this.users.filter(user =>
      user.fullName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      (user.role || 'User').toLowerCase().includes(search)
    );
  }

  get adminCount(): number {
    return this.users.filter(user => user.role === 'Admin').length;
  }

  get regularUsersCount(): number {
    return this.users.filter(user => user.role !== 'Admin').length;
  }

  loadUsers(): void {
    this.isLoading = true;

    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Error loading users');
      }
    });
  }

  deleteUser(user: AdminUser): void {
    if (user.role === 'Admin') {
      alert('You cannot delete the admin account.');
      return;
    }

    const confirmed = confirm(`Delete ${user.fullName}?`);

    if (!confirmed) return;

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        console.error(err);
        alert('Error deleting user');
      }
    });
  }
}