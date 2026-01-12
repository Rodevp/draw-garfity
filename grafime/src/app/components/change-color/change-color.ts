import { Component } from "@angular/core";

@Component({
    selector: 'app-change-color',
    templateUrl: './change-color.html',
    styleUrls: ['./change-color.css']
})
export class ChangeColorComponent {
    colorPresets = [
        "#000000",
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#FFA07A",
        "#98D8C8",
        "#F7DC6F",
        "#BB8FCE",
        "#85C1E2",
        "#52B788",
    ]
}

