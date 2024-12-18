export default class PeriodModel {
    date: string; 
    status: string; 
  
    constructor(date: string, status: string = "checked") {
      this.date = date;
      this.status = status;
    }
  }
  