import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import ToDo from '../../models/todo.model';
import Accident from "../../models/accident.model";
import {AccidentService} from "../../services/accident.service";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

    constructor(
        private todoService: TodoService,
        private accidentService: AccidentService
    ) { }

    public newTodo: ToDo = new ToDo()

    todosList: ToDo[];
    editTodos: ToDo[] = [];

    accidentsList: Accident[];

  ngOnInit(): void {
        this.todoService.getToDos()
            .subscribe(todos => {
                this.todosList = todos
                console.log(todos)
            })

      this.accidentService.getAccidents()
        .subscribe(accidents => {
          this.accidentsList = accidents
          console.log(accidents)
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