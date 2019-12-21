import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notebook} from "./model/notebook";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks()
  }
  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => {this.notebooks = res;},
      error => {alert("error");},
    );
  }

  createNotebook() {
    let newNotebook:Notebook = {
      name:"New notebook",
      id:null,
      nbOfNotes: 0
    }
    this.apiService.postNotebook(newNotebook).subscribe(
      res => {newNotebook.id = res.id
      this.notebooks.push(newNotebook);},
      error => {alert("error");},
    );
  }
}
