import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddNotePage } from '../add-note/add-note';
import { NoteServiceProvider } from '../../providers/note-service/note-service';
import { Note } from "../../models/note.model";
import { ViewNotePage } from "../view-note/view-note";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 private note: Note;
 private notes: Promise<Note[]>;
  constructor(public navCtrl: NavController, private noteService: NoteServiceProvider) {
  }
  ionViewWillEnter() {
    this.notes = this.getAllNotes();
  }
  addNote() {
    this.navCtrl.push(AddNotePage);
  }
  getNote(createDate: number) {
    this.noteService.getNote(createDate).then(snote => {
      this.note = snote;
      this.navCtrl.push(ViewNotePage,{note:this.note})
    })
  }
  getAllNotes() {
    return this.noteService.getAllNotes();
  }

}
