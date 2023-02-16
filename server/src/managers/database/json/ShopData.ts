import { Constants } from "../../../constants/Constants";
const fs = require("fs");

export class ShopData {

    public data: SD_Shop[] = [];

    constructor() {
        var path = Constants.PATH_TO_SHARED + "json/shops.json";
        fs.readFile(path, (err: any, data: any) => {
            if (err) throw err;

            var json = JSON.parse(data).shops;
            for (var i = 0; i < json.length; i++)
                this.data.push(new SD_Shop(json[i]));
        });
    }

    public getById(id: string) {
        for (var i = 0; i < this.data.length; i++)
            if (this.data[i].id == id)
                return this.data[i];
        return null;
    }

}

export class SD_Shop {

    public id: string;
    public name: string;
    public items: SD_Item[] = [];

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        for (var i = 0; i < data.items.length; i++)
            this.items.push(new SD_Item(data.items[i]));
    }

    public hasItem(itemId: number) {
        for (var i = 0; i < this.items.length; i++)
            if (this.items[i].id == itemId)
                return true;
        return false;
    }

    public getItemById(itemId: number) {
        for (var i = 0; i < this.items.length; i++)
            if (this.items[i].id == itemId)
                return this.items[i];
        return null;
    }

    public getJSON() {
        return {
            n: this.name,
            i: (() => {
                var items = [];
                for (var i = 0; i < this.items.length; i++)
                    items.push(this.items[i].getJSON());
                return items;
            })()
        }
    }

}

export class SD_Item {

    public id: number;
    public price: number;

    constructor(data: any) {
        this.id = data.id;
        this.price = data.price;
    }

    public getJSON() {
        return {
            i: this.id,
            p: this.price
        }
    }

}