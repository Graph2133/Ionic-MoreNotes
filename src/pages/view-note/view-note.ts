import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteServiceProvider } from "../../providers/note-service/note-service";
import { Note } from "../../models/note.model";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {
  note: Note;
  updateStatus: boolean = true;
  titleAlert = "Something went wrong";

  formGroup: FormGroup;
  date: Date = new Date();
  title: string = '';
  content: string = '';
  createDateStamp: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteService: NoteServiceProvider,
    public toastCtrl: ToastController) {
    this.note = this.navParams.get('note');
    this.createDateStamp = this.note.createDate;
  }

  ionViewDidLoad() {

  }

  deleteNode(createDate: number) {
    this.noteService.deleteNote(createDate);
    this.navCtrl.pop();
    let toast = this.toastCtrl.create({
      message: 'Note was successfully deleted.',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }
  updateNote(note) {
    note.createDate = this.createDateStamp;
    this.noteService.updateNote(note);
    this.note = note;
    this.updateStatus = true;
    let toast = this.toastCtrl.create({
      message: 'Note was successfully updated.',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  startUpdate() {
    this.updateStatus = false;
    this.formGroup = new FormGroup({
      title: new FormControl(this.note.title),
      content: new FormControl(this.note.content),
      date: new FormControl(this.note.date)
    })
  }
  declineUpdate() {
    this.updateStatus = true;
    let toast = this.toastCtrl.create({
      message: 'Update was cancelled.',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

}
