import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import ToDo from '../../models/todo.model';
import Accident from "../../models/accident.model";
import {AccidentService} from "../../services/accident.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

    constructor(
        private dataService: DataService,
        private todoService: TodoService,
        private accidentService: AccidentService
    ) { }

    public newTodo: ToDo = new ToDo()

    todosList: ToDo[];
    editTodos: ToDo[] = [];

    accidentsList: Accident[];

  selected = 'option2';
  ngOnInit(): void {
        this.todoService.getToDos()
            .subscribe(todos => {
                this.todosList = todos
                console.log(todos)
            })

      this.accidentService.getAccidents()
        .subscribe(accidents => {
          this.accidentsList = accidents
          this.dataService.changeAccidentList(accidents); // update accidentList to component which are subscribed
          console.log(accidents)
        })

   }

  getAccidentsGrav(grav :number) {
    console.log("ts: getAccidentsGrav")
    this.accidentService.getAccidentsGrav(grav)
      .subscribe(accidents => {
        this.accidentsList = accidents
        this.dataService.changeAccidentList(accidents); // update accidentList to component which are subscribed
      })
  }

  getAccidentsLum(lum :number) {
    console.log("ts: getAccidentsGrav")
    this.accidentService.getAccidentsLum(lum)
      .subscribe(accidents => {
        this.accidentsList = accidents
        this.dataService.changeAccidentList(accidents); // update accidentList to component which are subscribed
      })
  }

    create() {
        this.todoService.createTodo(this.newTodo)
            .subscribe((res) => {
                this.todosList.push(res.data)
                this.newTodo = new ToDo()
            })
    }

    editTodo(todo: ToDo) {
        console.log(todo)
        if(this.todosList.includes(todo)){
            if(!this.editTodos.includes(todo)){
                this.editTodos.push(todo)
            }else{
                this.editTodos.splice(this.editTodos.indexOf(todo), 1)
                this.todoService.editTodo(todo).subscribe(res => {
                    console.log('Update Succesful')
                }, err => {
                    this.editTodo(todo)
                    console.error('Update Unsuccesful')
                })
            }
        }
    }

    doneTodo(todo:ToDo){
        todo.status = 'Done'
        this.todoService.editTodo(todo).subscribe(res => {
            console.log('Update Succesful')
        }, err => {
            this.editTodo(todo)
            console.error('Update Unsuccesful')
        })
    }

    submitTodo(event, todo:ToDo){
        if(event.keyCode ==13){
            this.editTodo(todo)
        }
    }

    deleteTodo(todo: ToDo) {
        this.todoService.deleteTodo(todo._id).subscribe(res => {
            this.todosList.splice(this.todosList.indexOf(todo), 1);
        })
    }


    title = 'app';

}
