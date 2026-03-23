import { Component, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserSession } from '../../../../../shared/models/session/user-session-model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { SessionService } from '../../../../../services/features/session/session.service';
import { DatePipe } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIcon } from '@angular/material/icon';
import { JwtService } from '../../../../../services/features/auth/jwt.service';
import { AuthService } from '../../../../../services/features/auth/auth-service';

@Component({
  selector: 'app-user-sessions',
  templateUrl: './user-sessions.component.html',
  styleUrls: ['./user-sessions.component.scss'],
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    DatePipe,
    TranslocoModule,
    MatIcon,
  ],
})
export class UserSessionsComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<UserSession>;

  currentSessionId!: string;

  sessionsArray: UserSession[] = [];
  displayedColumns: string[] = [
    'start',
    'lastAccess',
    'device',
    'location',
    'currSession',
    'action',
  ];

  constructor(
    private sessionService: SessionService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.currentSessionId = this.jwtService.getSessionId() ?? '';

    this.sessionService.getAllUserSessions().subscribe({
      next: (response) => {
        this.sessionsArray = response.responseData ?? [];
      },
      error: (error) => {
        this.sessionsArray = [];
      },
    });
  }

  async onSessionCloseClick(sessionId: string) {
    try {
      const response = await firstValueFrom(this.authService.logoutSpecificUserSession(sessionId));
      this.sessionsArray = this.sessionsArray.filter((s) => s.id !== sessionId);
    } catch (error) {
      console.error('[UserSessions] Error closing session:', error);
    }
  }

  closeAllUserSessions() {
    this.authService.logoutAllUserSessions().subscribe({});
  }
}
