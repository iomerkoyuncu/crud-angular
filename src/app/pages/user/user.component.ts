import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userId: null | string = null;
  user: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.getUser(this.userId);
    }
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user;
    });
  }

  onDeleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      (user) => {
        this.toastr.success(
          'User with id: ' + id + ' was deleted successfully.',
          'User Deleted'
        );
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastr.error('Error deleting user', 'Error');
      }
    );
  }
}
