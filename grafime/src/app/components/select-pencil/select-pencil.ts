import { Component } from "@angular/core";
import { PencilComponent } from "../pencil/pencil";

@Component({
    selector: 'app-select-pencil',
    templateUrl: './select-pencil.html',
    styleUrls: ['./select-pencil.css'],
    imports: [PencilComponent]
})
export class SelectPencilComponent { }