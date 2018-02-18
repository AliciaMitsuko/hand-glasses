import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../services/data.service";

import {current} from "codelyzer/util/syntaxKind";
import Accident from "../../models/accident.model";
import {AccidentService} from "../../services/accident.service";

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
  idModal: number;

  message:string;

  accidentToEdit: Accident;
  accidentsList: Accident[];

  constructor(
    public activeModal: NgbActiveModal,
    private dataService: DataService,
    private accidentService: AccidentService
) {
    this.idModal = 0;
  }

  ngOnInit(): void {
    this.dataService.accidentToEdit.subscribe(message => this.accidentToEdit = message)
    this.dataService.accidentsList.subscribe(message => this.accidentsList = message) // moche :(
  }

  close() {
    this.activeModal.close();
  }
  editAccident(accident: Accident) {
    // this.accidentService.editAccident(accident).subscribe(res => {
    //   console.log('Update Succesful')
    // }, err => {
    //   this.editAccident(accident)
    //   console.error('Update Unsuccesful')
    // })

    this.activeModal.close();
  }


  deleteAccident(accident: Accident) {
    this.accidentService.deleteAccident(accident._id).subscribe(res => {

      // this.accidentsList.splice(this.accidentsList.indexOf(accident), 1);
      // this.dataService.changeAccidentList(this.accidentsList);
      //
      // this.activeModal.close();
    })
    this.accidentsList.splice(this.accidentsList.indexOf(accident), 1);
    this.dataService.changeAccidentList(this.accidentsList);

    this.activeModal.close();
  }

}
