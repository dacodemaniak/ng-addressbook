import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  @Input() entries: number
  @Output() toggleView: EventEmitter<boolean> = new EventEmitter()

  /**
   * Store current displaying state
   * @var boolean
   */
  public displayStatus: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  public toggleDisplay():  void {
    this.displayStatus = !this.displayStatus
    this.toggleView.emit(this.displayStatus)
    
  }
}
