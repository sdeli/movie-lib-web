import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout/breakpoints-observer';
import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'ml-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.scss'],
})
export class DescriptionDialogComponent implements AfterViewChecked {
  breakPoint$: Observable<BreakpointState>;
  isMaxLargeTablet: boolean;

  @ViewChild('description', { read: ElementRef, static: false }) description: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustHeightIfNeeded();
  }

  constructor(public dialogRef: MatDialogRef<DescriptionDialogComponent>) {}

  ngAfterViewChecked() {
    setTimeout(() => {
      this.adjustHeightIfNeeded();
    }, 0);
  }

  close() {
    this.dialogRef.close();
  }

  private adjustHeightIfNeeded() {
    if (this.description.nativeElement.offsetHeight > window.innerHeight) {
      const newHeight = window.innerHeight - 10 + 'px';
      this.dialogRef.updateSize(undefined, newHeight);
    }
  }
}
