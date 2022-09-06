import { BranchModel } from './branch-model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  constructor(private db: AngularFirestore) {}

  createBranch(branch: BranchModel) {
    return this.db.collection("branch").add(branch);
  }

  getBranch() {
    return this.db.collection("branch").snapshotChanges();
  }

  updateBranch(branch: BranchModel, branchId: string) {
    return this.db.collection("branch").doc(branchId).set(branch);
  }

  deleteBranch(branchId: string) {
    return this.db.collection("branch").doc(branchId).delete();
  }
}
