import { Component } from "@angular/core";
import { ChangeColorComponent } from "../change-color/change-color";
import { ChangeWidthComponent } from "../change-width/change-width";
import { HeaderComponent } from "../header/header";
import { SelectPencilComponent } from "../select-pencil/select-pencil";
import { ActionsComponent } from "../actions/actions";
import { BoardComponent } from "../board/board";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html',
    styleUrls: ['./layout.css'],
    imports: [
        ChangeColorComponent,
        ChangeWidthComponent,
        HeaderComponent,
        SelectPencilComponent,
        ActionsComponent,
        BoardComponent
    ]
})
export class LayoutComponent { }
