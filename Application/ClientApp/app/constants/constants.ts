import { ISpinnerConfig, SPINNER_ANIMATIONS, SPINNER_PLACEMENT } from "@hardpool/ngx-spinner";
import { VacationColor } from "../models/month-activity-models/vacation-color.model";

//for user-table.component
export const SPINNER_COFIG_CONST_OBJ = {
    SIZE: "3rem",
    COLOR: "#1574b3"
}
export const QUERY_MODEL_CONST_OBJ = {
    TAKE: null

}
export const FROM_COMPONENT = "component";

//for edit-month-cell.component
export const ARRAY_COLORS: VacationColor[] = [
    { Vacation: '', HexColor: '#FFFFFF' },
    { Vacation: 'отпуск', HexColor: '#0000FF' },
    { Vacation: 'больничный', HexColor: '#FF0000' },
    { Vacation: 'работа в выходной (+ день к отпуску)', HexColor: '#00FF00' },
    { Vacation: 'работа в выходной (доплата к зп)', HexColor: '#FFFF00' }
];

export const SPINNER_CONFIG: ISpinnerConfig = {
    placement: SPINNER_PLACEMENT.block_ui,
    animation: SPINNER_ANIMATIONS.spin_3,
    size: "3rem",
    color: "#1574b3"
};

//for month-activity.component
export const DIALOG_WIDTH = '1050px';