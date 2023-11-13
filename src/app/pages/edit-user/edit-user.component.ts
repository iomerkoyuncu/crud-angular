import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userForm: User = {
    id: '',
    firstName: '',
    lastName: '',
    title: '',
    picture: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.getUser(param.get('id')!);
    });
  }

  getUser(id: string) {
    this.userService.getUser(id).subscribe((data) => {
      this.userForm = data;
    });
  }

  onSaveChanges() {
    this.userService.updateUser(this.userForm).subscribe(() => {
      this.router.navigate(['/']);
      this.toastr.success('User updated successfully!', 'User Updated');
    });
  }
}
