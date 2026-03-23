import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../../services/gui/dialog.service';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { AccountsService } from '../../../../services/features/accounts/accounts-service';
import { UserTokenManagementService } from '../../../../services/user-token-management-service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  imports: [TranslocoModule],
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnInit {
  constructor(
    private accountService: AccountsService,
    private router: Router,
    private userTokenService: UserTokenManagementService,
  ) {}

  ngOnInit() {}

  onApprove() {
    this.accountService.deleteAccount().subscribe({
      next: (request) => {
        this.userTokenService.clearToken();
        this.router.navigate(['/']);
      },
      error: (err) => {
        window.alert('Błąd!');
      },
    });
  }

  onDeny() {
    this.router.navigate(['/']);
  }
}
