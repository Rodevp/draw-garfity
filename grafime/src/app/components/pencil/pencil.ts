import { Component, input } from "@angular/core";

@Component({
    selector: 'app-pencil',
    templateUrl: './pencil.html',
    styleUrls: ['./pencil.css']
})
export class PencilComponent {
    namePencil = input<string>();
}