import { Component, input } from "@angular/core";

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.html',
    styleUrls: ['./action-button.css']
})
export class ActionButtonComponent {
    text = input<string>();
}