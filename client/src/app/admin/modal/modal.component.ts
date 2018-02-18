import {AfterViewInit, Component, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from "../modal-content/modal-content.component";



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    // this.open();
  }

  open() {
    const modalRef = this.modalService.open(ModalContentComponent);
    // modalRef.componentInstance.name = 'World';
  }
}
