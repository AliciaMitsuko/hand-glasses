import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from "../modal-content/modal-content.component";



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() type:string;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(ModalContentComponent);
    // modalRef.componentInstance.name = 'World';
  }
}
