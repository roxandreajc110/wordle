import WordDictionary from "../models/wordDictionary.model";

export const existWord = async (word: string) => {
    return (await WordDictionary.findByPk(word) !== null) ? true : false;
}