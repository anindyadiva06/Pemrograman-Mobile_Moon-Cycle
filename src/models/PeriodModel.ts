export default class PeriodModel {
    date: string; // Format tanggal yyyy-MM-dd
    status: string; // 'checked' atau 'unchecked'
  
    constructor(date: string, status: string = "checked") {
      this.date = date;
      this.status = status;
    }
  }
  