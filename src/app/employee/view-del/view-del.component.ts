import { EmpModel } from './../emp-model';
import { EmployeeService } from './../employee.service';
import { EmployeeModule } from './../employee.module';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddEditComponent } from '../add-edit/add-edit.component';

@Component({
  selector: 'app-view-del',
  templateUrl: './view-del.component.html',
  styleUrls: ['./view-del.component.css']
})
export class EviewDelComponent implements OnInit {
  public empDetail: EmpModel[];
  
  constructor(
    config: NgbModalConfig,
    private readonly modalService: NgbModal,
    private readonly empService: EmployeeService,
    
  ) { 
    this.empDetail = [];
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getDataFromApi();
  }

/**
   *  Function to open Modal
   * @param editData Customer Data to be Edited
   */
 public openModel(editData: EmployeeModule | null): void {
  const modalRef = this.modalService.open(AddEditComponent, {
    size: "md",
  });
  modalRef.componentInstance.empEditData = editData;
  modalRef.result.then(() => {
    this.getDataFromApi();
  });
}

/**
   * Function for deleting employee data from table
   * @param employeeId Employee Id to be deleted
   */
 public deleteDataFromApi(employeeId: string): void {
  console.log("del=====>", employeeId);
  alert("Are You Sure You Want To Delete !");
  this.empService.deleteEmp(employeeId).then(() => {
    this.getDataFromApi();
  });
}

private getDataFromApi() {
  this.empService
    .getEmp()
   
    .subscribe((res) => {
      this.empDetail = res.map((e) => {
        return {
          isSelected: false,
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as EmpModel),
        };
      });
      this.empDetail.forEach((e)=>{
        return e.empId=e.id || '';
      });
    });
}
}
