import { EmployeeService } from './../employee.service';
import { EmpModel } from './../emp-model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchService } from 'src/app/branch/branch.service';
import { BranchModel } from 'src/app/branch/branch-model';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public empForm: FormGroup;
  branch:any;
  public branchDetail: BranchModel[];

  @Input()
  private empEditData: EmpModel | undefined;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private empService: EmployeeService,
    private readonly brService: BranchService
  ) {
    this.branchDetail = [];
    this.empForm = this.fb.group({
      empId:[''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      b_date: ['', Validators.required],
      branch: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // This will patch the value for edit when we click edit
    this.branchData();
    if (this.empEditData) {
      this.empForm.patchValue({
       empId:this.empEditData.empId,
       name: this.empEditData.name,
       phone: this.empEditData.phone,
       email: this.empEditData.email,
       b_date: this.empEditData.b_date,
       branch: this.empEditData.branch,
        
      });
    }
    console.log("Patch",this.empForm.value)
  }

  get empFormControl() {
    return this.empForm.controls;
  }

  // Method for posting and updating Customer Data
  public submittedData(): void {
    if (this.empEditData) {
      console.log("hey==>",this.empEditData)
      this.empService
        .updateEmp(this.empForm.value, this.empForm.value.empId)
        .then(() => {
          console.warn('Data Updated Successfully');
          this.closeModal();
        });
    } else {
      this.empService.createEmp(this.empForm.value).then(() => {
        console.warn('Data Added Successfully ~~',this.empForm.value);
        this.closeModal();
      });
    }
  }

  // To close Modal
  public closeModal(): void {
    this.modal.close();
  }

  private branchData(){
    this.brService.getBranch().subscribe((res)=> {
     console.log("hey===>",res)
     this.branchDetail = res.map((e) => {
      return {
        isSelected: false,
        ...(e.payload.doc.data() as BranchModel),
      };
    });
    console.log("hey===>",this.branchDetail)
    })
  }
}
