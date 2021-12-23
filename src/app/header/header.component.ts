import { Component, OnDestroy, OnInit,} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) {}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
          // this.isAuthenticated = !user ? false : true ; not a user false else true.
          this.isAuthenticated = !!user;
          console.log(!user);
          console.log(!!user);
          
        });
    }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    this.userSub = this.authService.user.subscribe(user => {
      console.log(user.token);
      console.log(user.id);
      console.log(user.email);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
      this.userSub.unsubscribe();
  }
}

