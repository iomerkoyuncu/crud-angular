import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  options: string[] = ['mr', 'miss', 'mrs', 'ms'];
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  userForm: any = {
    email: '',
    firstName: '',
    lastName: '',
    title: '',
    picture: '',
  };

  constructor(
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSaveChanges(): void {
    // Implement your save logic here
    this.userService.createUser(this.userForm).subscribe(() => {
      this.dialogRef.close();
      this.toastr.success('User created successfully.', 'User Created');
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Implement your save logic here
    this.dialogRef.close();
  }
}
