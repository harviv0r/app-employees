import {
  Injectable
} from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import {
  Observable
} from 'rxjs';
import {
  Emplooyees
} from './employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private firestore: AngularFirestore) {}

  addEmployee(client: Emplooyees): Promise < any > {
    return this.firestore.collection('employees').add(client);
  }

  getEmployees(): Observable < any > {
    return this.firestore.collection('employees', ref => ref.orderBy('name', 'asc')).snapshotChanges();
  }
  getEmployee(id: string): Observable < any > {
    return this.firestore.collection('employees').doc(id).snapshotChanges();
  }

  deleteEmployee(id: string): Promise < any > {
    return this.firestore.collection('employees').doc(id).delete();
  }

  updateEmployee(id: string, data: any): Promise < any > {
    return this.firestore.collection('employees').doc(id).update(data);
  }


}
