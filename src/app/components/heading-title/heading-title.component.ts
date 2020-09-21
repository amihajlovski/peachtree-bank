import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heading-title',
  templateUrl: './heading-title.component.html',
  styleUrls: ['./heading-title.component.scss'],
})
export class HeadingTitleComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  icon?: string;

  constructor() {}

  ngOnInit(): void {}
}
