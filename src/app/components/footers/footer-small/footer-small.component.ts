import { NgClass } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-footer-small",
  templateUrl: "./footer-small.component.html",
  standalone: true,
  imports: [NgClass]
})
export class FooterSmallComponent implements OnInit {
  date = new Date().getFullYear();

  @Input()
  get absolute(): boolean {
    return this._absolute;
  }
  set absolute(absolute: boolean) {
    this._absolute = absolute === undefined ? false : absolute;
  }
  private _absolute = false;

  constructor() {}

  ngOnInit(): void {}
}
