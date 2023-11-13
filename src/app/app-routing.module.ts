import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'user-edit/:id', component: EditUserComponent },
  { path: 'user-create', component: CreateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
