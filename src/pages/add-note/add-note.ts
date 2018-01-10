import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteServiceProvider } from '../../providers/note-service/note-service';
import { Note } from "../../models/note.model";
import { FormGroup, Validators, FormControl } from "@angular/forms";
@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {
  titleAlert="Something went wrong";
  formGroup: FormGroup;
  note: Note;
  date: Date = new Date();
  title: string = '';
  content: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private noteService: NoteServiceProvider) {
    this.formGroup = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
      date: new FormControl()
    })
  }

  saveNote(note: Note) {
    this.noteService.saveNote(note);
    this.navCtrl.pop();  
  }

}
