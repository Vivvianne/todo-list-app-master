import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDolist: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    this.toDolist = this.firebasedb.list('titles');
    return this.toDolist;
  }

  addTitle(title: string) {
    var today = new Date().toLocaleString();
    console.log(today);
    this.toDolist.push({
      title: title,
      dateAdded : today,
      dateChecked: " ",
      isChecked: false,
    })
  }
  checkOrUnCheckTitle($key: string, flag: boolean){
    var today = new Date().toLocaleString();
    this.toDolist.update($key, { isChecked: flag, dateChecked: today});
  }
  removeTitle($key: string){
    this.toDolist.remove($key);
  }
}
