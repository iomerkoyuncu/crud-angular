import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/User';
import { ToastrService } from 'ngx-toastr';

import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);

  displayedColumns: string[] = [
    'id',
    'title',
    'firstName',
    'lastName',
    'image',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.data;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openUserDialog(): void {
    this.matDialog.open(CreateUserComponent, {
      width: '600px',
    });
  }

  onDeleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      (user) => {
        this.toastr.success(
          'User with id: ' + id + ' was deleted successfully.',
          'User Deleted'
        );
        this.refreshData();
      },
      (error) => {
        this.toastr.error('Error deleting user', 'Error');
      }
    );
  }

  private refreshData() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.data;
      this.dataSource.data = this.users;
    });
  }
}
