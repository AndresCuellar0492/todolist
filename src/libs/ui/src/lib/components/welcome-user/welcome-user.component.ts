import { Component, Input } from '@angular/core';
import { ModalService } from 'src/libs/ui/src/lib/services/modal.service';

@Component({
  selector: 'app-welcome-user-component',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.scss'],
})
export class WelcomeUserComponent {
  @Input() image!: string;
  @Input() title!: string;
  @Input() email!: string;
  @Input() content!: string;
  @Input() button!: string;

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.close({ dismissed: true });
  }

  handleClick() {
    console.log('Button clicked inside the modal');
    this.modalService.close({ clicked: true });
  }
}
