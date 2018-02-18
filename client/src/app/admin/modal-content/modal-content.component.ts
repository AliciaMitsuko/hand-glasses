import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../services/data.service";

import {current} from "codelyzer/util/syntaxKind";

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
  idModal: number;

  message:string;

  counter= {};


  constructor(
    public activeModal: NgbActiveModal,
    private data: DataService
) {
    this.counter= {};
    this.idModal = 0;
  }

  ngOnInit(): void {

  }

}
