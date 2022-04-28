import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat/chat.component";
import { ChatService } from "../Services/chat.service";

@NgModule({
    declarations: [ChatComponent],
    imports: [CommonModule, ChatRoutingModule],
    exports: [ChatComponent],
    providers: [ChatService],
})
export class ChatModule {}
