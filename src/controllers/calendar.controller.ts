import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

export class CalendarController {
  view: string = 'month';
  displayedData: any[] = [];

  constructor(private firestore: Firestore) {}

  async fetchData(view: string): Promise<any[]> {
    const colRef = collection(this.firestore, 'menstruation');
    const q = query(colRef, where('view', '==', view));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }
}