import { Component, OnInit } from '@angular/core';
import { CalendarController } from '../../controllers/calendar.controller';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  view: string = 'month';
  displayedData: any[] = [];

  contentStyle = {
    '--background': '#FFE3F1'
  };

  private calendarController: CalendarController;

  constructor(calendarController: CalendarController) {
    this.calendarController = calendarController;
  }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    this.displayedData = await this.calendarController.fetchData(this.view);
  }

  changeView(event: any) {
    this.view = event.detail.value;
    this.fetchData();
  }
}
