export class ResultWord {
    private letter: string;
    private value: any;

    public constructor(letter: string, value: number) {
        this.letter = letter;
        this.value = value;
    }

    get getLetter(): string {
        return this.letter;
    }
}

export class ResponseResultWord {
    private word: string;
    private detailWord: ResultWord[];

    public constructor(word: string, detailWord:  ResultWord[]) {
        this.word = word;
        this.detailWord = detailWord;
    }
}