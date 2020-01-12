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
  selectedNotebook: Notebook;

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

      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {

        },
        err => {
          console.log(err.toString());
          alert('An error has occurred while deleting the notebook');
        }
      );


  }

  getAllNotes() {
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

      this.apiService.deleteNote(note.id).subscribe(
        res => {let indexOfNotes = this.notes.indexOf(note);
        this.notes.splice(indexOfNotes, 1);

        },
        err => {
          console.log(err.toString());
          alert('An error has occurred while deleting the note');
        })

  }

  createNote(notebookId: string) {
    let newNote: Note = {
      id: null,
      title: "New Note",
      text: "Write some text in here",
      lastModifiedOn: null,
      notebookId: notebookId
    };

    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {alert("An error occurred while saving the note");}
    );
  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.apiService.getAllByNotebookId(notebook.id).subscribe(
      res=> {
        this.notes = res;
      },
      err =>{alert("An error has occurred while downloading the notes;")}
    );
  }
  updateNote(updatedNote: Note) {
    this.apiService.saveNote(updatedNote).subscribe(
      res => {
      },
      err => {alert("An error occurred while saving the note");}
    );
  }
  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
