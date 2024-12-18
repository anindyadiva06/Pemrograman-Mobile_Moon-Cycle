import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  Timestamp,
  DocumentData 
} from 'firebase/firestore';
import { auth } from './firebase';
import firebaseApp from './firebase';

const db = getFirestore(firebaseApp);

class PeriodTrackerService {
  private readonly CYCLE_LENGTH = 28;
  private readonly PERIOD_LENGTH = 7;
  private readonly OVULATION_DAY = 13;
  private readonly FERTILE_WINDOW_DAYS = 3;

  async savePeriodCycle(userId: string, startDate: Date): Promise<string> {
    if (!userId) {
      throw new Error('User ID diperlukan');
    }
    
    try {
      const cycleData = {
        userId,
        startDate: Timestamp.fromDate(startDate),
        cycleLength: this.CYCLE_LENGTH,
        periodLength: this.PERIOD_LENGTH
      };

      const cycleRef = await addDoc(collection(db, 'periodCycles'), cycleData);
      const predictions = this.calculatePredictions(startDate);
      
      await addDoc(collection(db, 'predictions'), {
        cycleId: cycleRef.id,
        userId,
        ...this.convertDatesToTimestamps(predictions)
      });

      return cycleRef.id;
    } catch (error) {
      console.error('Error menyimpan data siklus:', error);
      throw new Error('Gagal menyimpan data siklus');
    }
  }

  private convertDatesToTimestamps(predictions: any) {
    return {
      ovulationDate: Timestamp.fromDate(predictions.ovulationDate),
      fertileWindowStart: Timestamp.fromDate(predictions.fertileWindowStart),
      fertileWindowEnd: Timestamp.fromDate(predictions.fertileWindowEnd),
      predictedStartDate: Timestamp.fromDate(predictions.nextPeriodStart)
    };
  }

  async getCalendarData(userId: string, month: number, year: number): Promise<DocumentData[]> {
    if (!userId) {
      throw new Error('User ID diperlukan');
    }

    try {
      const cyclesRef = collection(db, 'periodCycles');
      const cyclesQuery = query(cyclesRef, where('userId', '==', userId));
      const cyclesSnapshot = await getDocs(cyclesQuery);
      
      if (cyclesSnapshot.empty) {
        return [];
      }

      const cycles = cyclesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const cycleData = await Promise.all(
        cycles.map(async (cycle) => {
          const predictionsQuery = query(
            collection(db, 'predictions'),
            where('cycleId', '==', cycle.id)
          );
          
          const predictionsSnap = await getDocs(predictionsQuery);
          const predictions = predictionsSnap.empty ? null : predictionsSnap.docs[0].data();

          return {
            ...cycle,
            predictions
          };
        })
      );

      return cycleData;
    } catch (error) {
      console.error('Error mengambil data kalender:', error);
      throw new Error('Gagal mengambil data kalender');
    }
  }

  private calculatePredictions(startDate: Date) {
    const ovulationDate = new Date(startDate);
    ovulationDate.setDate(ovulationDate.getDate() + this.OVULATION_DAY);

    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - this.FERTILE_WINDOW_DAYS);

    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + this.FERTILE_WINDOW_DAYS);

    const nextPeriodStart = new Date(startDate);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + this.CYCLE_LENGTH);

    return {
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      nextPeriodStart
    };
  }
}

export const periodTrackerService = new PeriodTrackerService();