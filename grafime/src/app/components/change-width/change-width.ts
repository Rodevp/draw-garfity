import { Component, inject } from "@angular/core";
import { ToolStore } from "../../store/tool.store";

@Component({
    selector: 'app-change-width',
    templateUrl: './change-width.html',
    styleUrls: ['./change-width.css']
})
export class ChangeWidthComponent {
    toolStore = inject(ToolStore);


    setSize(event: Event) {
        const target = event.target as HTMLInputElement;
        this.toolStore.setSize(Number(target.value));
    }

}