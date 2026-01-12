import { Component } from "@angular/core";
import { ActionButtonComponent } from "../button-actions/action-button";

@Component({
    selector: 'app-actions',
    templateUrl: './actions.html',
    styleUrls: ['./actions.css'],
    imports: [ActionButtonComponent]
})
export class ActionsComponent { }