
export class ChatData {

    public chats: CD_Chat[] = [];

    public reset() {
        this.chats = [];
    }

    public addChat(chat: CD_Chat) {
        this.chats.push(chat);
    }

    public removeChat(chat: CD_Chat) {
        for (let i = 0; i < this.chats.length; i++)
            if (this.chats[i] == chat)
                this.chats.splice(i, 1);
    }

}

export class CD_Chat {

    constructor(json: any) {
    }

}
