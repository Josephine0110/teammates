import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WhitespaceValidator } from './whitespace-validator';
import { Course } from '../../../types/api-output';
import { FEEDBACK_SESSION_NAME_MAX_LENGTH } from '../../../types/field-validator';

/**
 * Copy current session modal.
 */
@Component({
  selector: 'tm-copy-session-modal',
  templateUrl: './copy-session-modal.component.html',
  styleUrls: ['./copy-session-modal.component.scss'],
})
export class CopySessionModalComponent {

  // const
  FEEDBACK_SESSION_NAME_MAX_LENGTH: number = FEEDBACK_SESSION_NAME_MAX_LENGTH;

  @Input()
  courseCandidates: Course[] = [];

  @Input()
  sessionToCopyCourseId: string = '';

  newFeedbackSessionName: string = '';
  copyToCourseSet: Set<string> = new Set<string>();

  constructor(public activeModal: NgbActiveModal) {}

  form = new FormGroup({
    newFeedbackSessionName: new FormControl('', [Validators.required, WhitespaceValidator.cannotContainWhitespace]),
  });

  /**
   * Fires the copy event.
   */
  copy(): void {
    this.activeModal.close({
      newFeedbackSessionName: this.newFeedbackSessionName,
      sessionToCopyCourseId: this.sessionToCopyCourseId,
      copyToCourseList: Array.from(this.copyToCourseSet),
    });
  }

  /**
   * Toggles selection of course to copy to in set.
   */
  select(courseId: string): void {
    if (this.copyToCourseSet.has(courseId)) {
      this.copyToCourseSet.delete(courseId);
    } else {
      this.copyToCourseSet.add(courseId);
    }
  }
  /**
   * Checks whether the Feedback Session name entered by user is whitespace or not
   *
   * @param newFeedbackSessionName a string variable
   * @returns boolean
   */
  noWhitespace(newFeedbackSessionName: string): boolean {
    return (!(newFeedbackSessionName.trim().length === 0 && newFeedbackSessionName !== ''));
  }
}
