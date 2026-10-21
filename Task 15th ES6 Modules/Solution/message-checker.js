import { checkSpam } from "./spam-check.js";

export function checkMessage(text) {
    if (checkSpam(text)) {
        return `Сообщение «${text}» содержит спам`;
    }

    return `Сообщение «${text}» не содержит спама`;
}
