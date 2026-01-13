import { Component, inject } from "@angular/core";
import { ActionButtonComponent } from "../button-actions/action-button";
import { ToolStore } from "../../store/tool.store";

@Component({
    selector: 'app-actions',
    templateUrl: './actions.html',
    styleUrls: ['./actions.css'],
    imports: [ActionButtonComponent]
})
export class ActionsComponent {

    toolStore = inject(ToolStore);

    clear() {
        if (!this.toolStore.ctx() || !this.toolStore.canvas()) return;
        this.toolStore.ctx().clearRect(0, 0, this.toolStore.canvas().width, this.toolStore.canvas().height);
    }

    download() {
        if (!this.toolStore.canvas()) return;

        this.toolStore.ctx().save();
        this.toolStore.ctx().globalCompositeOperation = 'destination-over';
        this.toolStore.ctx().fillStyle = '#ffffff';
        this.toolStore.ctx().fillRect(0, 0, this.toolStore.canvas().width, this.toolStore.canvas().height);
        this.toolStore.ctx().restore();

        const url = this.toolStore.canvas().toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'draw-grafi.png';
        link.click();
    }


}