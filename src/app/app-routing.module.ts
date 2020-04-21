import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.gaurd';
import { LoginComponent } from './auth/login/login.component';
import { SignupModalComponent } from './auth/signup/signup.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupModalComponent },
    { path: 'admin', component: AdminComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
