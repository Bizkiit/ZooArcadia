import { Animal } from "./animal.model";

export interface AnimalMongoDb extends Animal {
    clickcount: number;
}