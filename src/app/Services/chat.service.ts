import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ChatService {
    constructor() {}
    chatbot() {
        (function (d, m) {
            var kommunicateSettings = {
                appId: "72e917ae0b7beca6e76771120c746555",
                popupWidget: true,
                automaticChatOpenOnNavigation: true,
            };
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            (window as any).kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, (window as any).kommunicate || {});
    }
}
