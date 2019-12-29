import { Component, OnInit } from '@angular/core';
import {Notebook} from './model/notebook';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }
  notebooks: Notebook[] = [];
  notes: Note[] = [];

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks() {
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
        console.log(this.notebooks);
      },
      error => {
        alert('error');
      },
    );
  }

  createNotebook() {
    const newNotebook: Notebook = {
      name: 'New notebook',
      id: null,
      nbOfNotes: 0
    };
    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      error => {
        alert('error');
      },
    );
  }

  updatedNotebook(updatedNotebook: Notebook) {
    this.apiService.postNotebook(updatedNotebook).subscribe(
      res => {
      },
      error => {
        alert('error');
      },
    );
  }

  deleteNotebook(notebook: Notebook) {
    if (confirm('r u sure')) {
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {},
        err => {
          console.log(err.toString());
          alert('An error has occurred while deleting the notebook');
        }
      );
    }

  }
  getAllNotes(){
      this.apiService.getAllNotes().subscribe(
        res => {
          this.notes = res;
        },
        err => {
          console.log(err.toString());
          alert('An error has occurred while deleting the notebook');
        }
      );
  }

  deleteNote(note: Note) {
    this.apiService.deleteNote(note.id).subscribe(res => {},
      err => {
        console.log(err.toString());
        alert('An error has occurred while deleting the note');
      })
  }
}
