import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from "../../models/note.model";
import 'rxjs/Rx';

@Injectable()
export class NoteServiceProvider {
  private notes: Note[] = [];
  private singleNote: Note;
  constructor(public storage: Storage) { }

  saveNote(note: Note) {
    note.createDate = Date.now();
    this.notes.push(note);
    this.storage.set('notes', this.notes);
  }

  getAllNotes() {
    return this.storage.get('notes').then(
      (notes) => {
        this.notes = notes == null ? [] : notes;
        return [...this.notes];
      }
    );
  }

  getNote(createDate: number) {
    return this.storage.get('notes').then(notes => {
      var noteToFind = notes.find(x => x.createDate == createDate);
      this.singleNote = noteToFind;
      return this.singleNote;
    })
  }

  deleteNote(createDate: number) {
    this.notes = this.notes.filter(notes => notes.createDate != createDate);
    this.storage.set('notes', this.notes);
  }
  updateNote(note) {
    this.storage.get('notes').then(notes => {
      let itemIndex = this.notes.findIndex(item => item.createDate == note.createDate);
      this.notes[itemIndex] = note;
      this.storage.set('notes', this.notes);
      return true;
    });
  }
}
