import { Ingredient } from ".";

export class Lunch {
    constructor(
        public id?: number,
        public name?: string,
        public value?: number,
        public veggie?: boolean,
        public image?: string,
        public ingredients?: Ingredient[]
    ){}
}
