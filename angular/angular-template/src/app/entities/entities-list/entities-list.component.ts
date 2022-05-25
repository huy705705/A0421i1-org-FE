import {Component, OnInit} from '@angular/core';
import {EntitiesService} from "../../service/entities.service";
import {Router} from "@angular/router";
import {Entities} from "../../model/entities";
import {FormGroup} from "@angular/forms";
import {EntitiesDeleteComponent} from "../entities-delete/entities-delete.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../service/token-storage.service";

import {CageService} from "../../service/cage.service";


@Component({
  selector: 'app-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.css']
})
export class EntitiesListComponent implements OnInit {
  entitiesForm: FormGroup;
  dialogRef: MatDialogRef<EntitiesDeleteComponent>;
  page: number = 0;
  entities2: Array<any>;
  pages: Array<number>;
  entities: any;
  inDateMin = '';
  inDateMax = '';
  emptyMessenger = '';
  cage = '';
  isSubmitted=false;
  isTrue=false;
  isTrue2=true;
  deleteMessenger;
  isSearch : boolean=false;


  pageTotal:number=0;
  // Cac bien cho seacrh
  pageSearch :Array<number>;
  pageSearchCurrent :number=0;
  pageSearchTotal :number=0;
  findEntitiesByCage: string;

  openDialog(id) {
    console.log("Id "+id)
    this.dialogRef = this.dialog.open(EntitiesDeleteComponent, {
      width: '600px',
      data: id,
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMessenger = 'Nhân viên ' + id + ' đã được xoá thành công';
        this.page = 0;
        this.ngOnInit();
      }
    });
  }



  constructor(private entitiesService: EntitiesService, private router: Router, public dialog: MatDialog,private cageService :CageService) {
  }

  ngOnInit(): void {
    this.cageService.getCageIdFromCageComponent().subscribe((data)=>{
      this.cage=data;
    })
    if(this.cage!=null && this.cage!=""){
      this.search();
    }
    else {
      this.findAllPageable();
      console.log(this.isTrue);
    }

  }

  findAllPageable() {

    this.isTrue2 = true;
    this.entitiesService.findAllPageable(this.page).subscribe(
      data => {
        this.entities2 = data['content']
        this.pages = new Array(data['totalPages'])
        this.pageTotal = data['totalPages']


      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.findAllPageable();
  }

  updateEntities(entity: any) {

  }

  search() {
    this.pageSearchCurrent=0;
    this.isSearch=true;
    this.isTrue=true;
    console.log(this.isTrue)
    console.log(this.isSubmitted)

    console.log(this.inDateMin)
    console.log(this.inDateMax)
    this.entitiesService.searchEntities(this.inDateMin,this.inDateMax, this.cage,this.pageSearchCurrent).subscribe(

      data => {
        console.log(data);
        if (data) {
          this.entities2 = data['content']
          this.pageSearch = new Array(data['totalPages'])
          this.pageSearchTotal=data['totalPages'];

          this.isSubmitted=true;
          this.isTrue2=true;


        }
      },
      (error) => {
        console.log(error.message)
        this.isSubmitted=false;
        this.isTrue2=false;
      }
    );
  }
  setSearch(i: number , event: any) {
    event.preventDefault();
    this.pageSearchCurrent = i;
    console.log(this.pageSearchCurrent)
    this.entitiesService.searchEntities(this.inDateMin,this.inDateMax, this.cage,this.pageSearchCurrent).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.entities2 = data['content']
          this.pageSearch = new Array(data['totalPages'])
          this.pageSearchTotal=data['totalPages'];
          this.isSubmitted=true;
          this.isTrue2=true;


        }
      },
      (error) => {
        console.log(error.message)
        this.isSubmitted=false;
        this.isTrue2=false;
      }
    );
  }

}
