import { Component, inject } from "@angular/core";
import { PencilComponent } from "../pencil/pencil";
import { ToolStore } from "../../store/tool.store";
import { Brush } from "../../types";

@Component({
    selector: 'app-select-pencil',
    templateUrl: './select-pencil.html',
    styleUrls: ['./select-pencil.css'],
    imports: [PencilComponent]
})
export class SelectPencilComponent {
    pencils = [
        "Pencil",
        "Chisel",
        "Spray",
        "Spray-Rafash",
        "Acrilyc",
        "Eraser"
    ]

    toolStore = inject(ToolStore);

    selectPencil(pencil: string) {
        this.toolStore.setBrush(pencil.toLocaleLowerCase() as Brush);
    }

}