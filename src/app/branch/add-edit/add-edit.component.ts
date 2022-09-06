import { BranchModel } from './../branch-model';
import { BranchService } from './../branch.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  public branchForm: FormGroup;

  @Input()
  private brEditData: BranchModel | undefined;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private brService: BranchService
  ) {
    // this.brEditData = {}
    this.branchForm = this.fb.group({
      branchId: [''],
      name: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // This will patch the value for edit when we click edit
    if (this.brEditData) {
      this.branchForm.patchValue({
        branchId: this.brEditData.branchId,
        name: this.brEditData.name,
        location: this.brEditData.location,
      });
    }
  }

  // get the controls of every field present in form
  public get branchFormControl() {
    return this.branchForm.controls;
  }

  // Method for posting and updating Customer Data
  public submittedData(): void {
    if (this.brEditData) {
      this.brService
        .updateBranch(this.branchForm.value, this.branchForm.value.branchId)
        .then(() => {
          this.closeModal();
        });
    } else {
      this.brService.createBranch(this.branchForm.value).then(() => {
        this.closeModal();
      });
    }
  }

  // To close Modal
  public closeModal(): void {
    this.modal.close();
  }
}
