import { Lunch } from ".";

export class Promotion {
    constructor(
        public id?: number,
        public name?: string,
        public value?: number,
        public image?: string,
        public lunchs?: {
            quantity?: number, 
            lunchs?: Lunch[]
        }[]
    ){}
}
