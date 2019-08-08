import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toaster: ToastrService
    ) {}

  private tokenName = environment.tokenName;
  canActivate() {
    if (!localStorage.getItem(this.tokenName)) {
      this.router.navigate(['login']);
      this.toaster.error('로그인 후 이용해주세요.');
      return false;
    }
    return true;
  }
}
