/*
import { Engine } from "../../app";
import { Player } from "../player/Player";
import { UserSaveRecord } from "./UserSaveRecord";

export class UserSaveRecords {

    private engine: Engine;
    private player: Player;
    private records: UserSaveRecord[] = [];

    constructor(engine: Engine, player: Player) {
        this.engine = engine;
        this.player = player;
    }

    public load(userId: number, callback: CallableFunction) {
        var db = this.engine.dbManager.getDb();
        db.query(
            `SELECT * FROM user_save WHERE us_userId = ${userId}`,
            (err: any, result: any, fields: any) => {
                if (err) throw new Error(err);

                for (var i = 0; i < result.length; i++) {
                    var newSaveRecord = new UserSaveRecord(this.engine, this.player);
                    newSaveRecord.loadFromRecord(result[i]);
                    this.records.push(newSaveRecord);
                }

                callback();
            }
        );
    }

    public add(record: UserSaveRecord) {
        this.records.push(record);
    }

    public removeAllWithoutSaveId(saveId: number) {
        for (var i = this.records.length - 1; i >= 0; i--)
            if (this.records[i]._id != saveId)
                this.records.splice(i, 1);
    }

    public getById(id: number) {
        for (var i = 0; i < this.records.length; i++)
            if (this.records[i]._id == id)
                return this.records[i];
        return null;
    }

    public getNumOfSaves() {
        return this.records.length;
    }

    public getSaveScreenJSON() {
        var saves = [];
        for (var i = 0; i < this.records.length; i++)
            saves.push(this.records[i].getSaveScreenJSON());
        return saves;
    }

    public getJSON() {
        var saves = [];
        for (var i = 0; i < this.records.length; i++)
            saves.push(this.records[i].getJSON());
        return saves;
    }

}
*/