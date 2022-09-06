import { BranchModel } from './../branch-model';
import { BranchService } from './../branch.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-view-del',
  templateUrl: './view-del.component.html',
  styleUrls: ['./view-del.component.css']
})
export class ViewDelComponent implements OnInit {
  public branchDetail: BranchModel[];
  constructor(
    config: NgbModalConfig,
    private readonly modalService: NgbModal,
    private readonly brService: BranchService
  ) { 
    this.branchDetail = [];
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getDataFromApi();
    
  }
/**
   *  Function to open Modal
   * @param editData Branch Data to be Edited
   */
 public openModel(editData: BranchModel | null): void {
  const modalRef = this.modalService.open(AddEditComponent, {
    size: "md",
  });
  modalRef.componentInstance.brEditData = editData;
  modalRef.result.then(() => {
    this.getDataFromApi();
  });
}
/**
   * Function for deleting employee data from table
   * @param branchId Employee Id to be deleted
   */
 public deleteDataFromApi(branchId: string): void {
  alert("Are You Sure You Want To Delete !");
  this.brService.deleteBranch(branchId).then(() => {
    this.getDataFromApi();
  });
}

// Function to get data from server
private getDataFromApi() {
  this.brService
    .getBranch()
    .subscribe((res) => {
      this.branchDetail = res.map((e) => {
        return {
          isSelected: false,
         id: e.payload.doc.id,
          ...(e.payload.doc.data() as BranchModel),
        };
      });
        this.branchDetail.forEach((e)=>{
          return e.branchId=e.id || '';
        });
    }); 
}
}

