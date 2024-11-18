import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../shared/service/history/history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  updates: { icon: string; title: string; description: string; time: Date }[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.loadUpdates();
  }

  loadUpdates() {
    this.updates = this.historyService.getUpdates();
  }
  
}
