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
    { vacation: '', hexColor: '#FFFFFF' },
    { vacation: 'отпуск', hexColor: '#0000FF' },
    { vacation: 'больничный', hexColor: '#FF0000' },
    { vacation: 'работа в выходной (+ день к отпуску)', hexColor: '#00FF00' },
    { vacation: 'работа в выходной (доплата к зп)', hexColor: '#FFFF00' }
];

export const SPINNER_CONFIG: ISpinnerConfig = {
    placement: SPINNER_PLACEMENT.block_ui,
    animation: SPINNER_ANIMATIONS.spin_3,
    size: "3rem",
    color: "#1574b3"
};

//for month-activity.component
export const DIALOG_WIDTH = '1050px';