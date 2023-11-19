import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from './services/logger/logger.service';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CartModule } from './modules/cart/cart.module';
import { SharedModule } from './modules/shared/shard.module';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [LoggerService],
  imports: [CommonModule, SharedModule, RouterOutlet, HeaderComponent, SidenavComponent, CartModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-SSR-workshop';
  public sideNavOpened = false;
  constructor(
    private logger: LoggerService
  ) { }

  public ngOnInit(): void {
    this.logger.debug('init AppComponent');
  }

  public toggleSideNave() {
    this.sideNavOpened = !this.sideNavOpened;
  }
}
