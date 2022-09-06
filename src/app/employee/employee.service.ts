import { EmpModel } from './emp-model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private db: AngularFirestore) {}

  createEmp(emp: EmpModel) {
    return this.db.collection("employee").add(emp);
  }

  getEmp() {
    return this.db.collection("employee").snapshotChanges();
  }

  updateEmp(emp: EmpModel, empId: string) {
    return this.db.collection("employee").doc(empId).set(emp);
  }

  deleteEmp(empId: string) {
    return this.db.collection("employee").doc(empId).delete();
  }
}
