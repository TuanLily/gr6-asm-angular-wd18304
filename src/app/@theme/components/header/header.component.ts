import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LayoutService } from "../../../@core/services/common/layout.service";
import { LocalStorageService } from 'app/@core/services/common';
import { LOCALSTORAGE_KEY } from 'app/@core/config';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile', icon: 'person-outline' }, { title: 'Log out', icon: 'log-out-outline' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
    private storageService: LocalStorageService // Inject StorageService

  ) { }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    const userName = this.storageService.getItem(LOCALSTORAGE_KEY.userInfo);
    this.user = { name: userName || 'Admin Dom', picture: 'assets/images/user.png' };

    //* Lắng nghe sự kiến click trên menu (ở đây là đang làm với chức năng Log out)
    this.menuService.onItemClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => this.onMenuClick(event.item));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onMenuClick(event) {
    if (event.title === 'Log out') {
      this.logout();
    }
  }

  logout() {
    // Xóa các thông tin tài khoản trên LocalStorage
    this.storageService.removeItem(LOCALSTORAGE_KEY.userInfo);
    this.storageService.removeItem(LOCALSTORAGE_KEY.token);
    this.storageService.removeItem(LOCALSTORAGE_KEY.refreshToken);
    this.router.navigate(['/auth/login']);
  }
}
