
export class NameGenerator {

    //#region === Account Name Generator ===

    public static getName() {
        var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var pre = ["ansy", "bald", "beefy", "chubby", "clean", "dozy", "drab", "eery", "fancy", "fit", "flabby", "gaunt", "goofy", "hardy", "mushy", "plain", "plump", "scruffy", "skinny", "stocky", "ugly", "artsy", "brave", "calm", "eager", "fallen", "gentle", "happy", "jolly", "kind", "lively", "nice", "polite", "proud", "silly", "tepid", "witty", "zealous", "angry", "clumsy", "fierce", "grumpy", "holy", "itchy", "lazy", "nervous", "scary", "uptight", "worried", "big", "cold", "fat", "great", "huge", "little", "petite", "puny", "scrawny", "short", "small", "tall", "tiny"];
        var post = ["actor", "apple", "balloon", "banana", "battery", "beach", "beard", "bed", "boy", "branch", "brother", "camera", "candle", "car", "cartoon", "church", "crayon", "diamond", "dinner", "doctor", "dog", "dream", "dress", "egg", "ear", "engine", "eye", "fish", "flag", "flower", "football", "forest", "fountain", "garage", "gold", "grass", "guitar", "hair", "iceburg", "island", "jar", "juice", "knight", "king", "lemon", "laundry", "maze", "mouse", "needle", "nail", "otter", "opal", "piper", "pickle", "queen", "quail", "road", "record", "swamp", "shore", "train", "taco", "unicorn", "victor", "water", "witch", "yard", "zebra"];
        var preIndex = Math.floor(Math.random() * pre.length);
        var postIndex = Math.floor(Math.random() * post.length);

        var name = pre[preIndex] + post[postIndex];
        for (var i = 0; i < 4; i++) {
            var numberIndex = Math.floor(Math.random() * numbers.length);
            name += numbers[numberIndex];
        }

        return name;
    }

    //#endregion

}