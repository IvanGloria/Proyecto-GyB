import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/shared/service/history/history.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/authService/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isMenuOpen = false;
  updates: any[] = [];
  displayedUpdates: any[] = [];
  totalUpdates = 0;
  currentPage = 1;
  itemsPerPage = 5;
  pages: number[] = [];

  constructor(private historyService: HistoryService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.historyService.getUpdates().subscribe((data) => {
      this.updates = data;
      this.totalUpdates = data.length;
      this.calculatePagination();
      this.updateDisplayedUpdates();
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  calculatePagination() {
    const totalPages = Math.ceil(this.totalUpdates / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  updateDisplayedUpdates() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedUpdates = this.updates.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedUpdates();
  }

  deleteUpdate(id: string) {
    this.historyService.deleteUpdate(id).then(() => {
      console.log(`Update with id ${id} deleted`);
    });
  }
}
