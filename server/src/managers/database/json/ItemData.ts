import { Constants } from "../../../constants/Constants";
const fs = require("fs");

export class ItemData {

    public data: ID_Item[] = [];

    constructor() {
        var path = Constants.PATH_TO_SHARED + "json/items.json";
        fs.readFile(path, (err: any, data: any) => {
            if (err) throw err;

            var json = JSON.parse(data).items;
            for (var i = 0; i < json.length; i++)
                this.data.push(new ID_Item(json[i]));
        });
    }

    public getById(id: number) {
        for (var i = 0; i < this.data.length; i++)
            if (this.data[i].id == id)
                return this.data[i];
        return null;
    }

}

export class ID_Item {

    public id: number;

    constructor(data: any) {
        this.id = data.id;
    }

}