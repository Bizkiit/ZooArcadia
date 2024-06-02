import { Animal } from "./animal.model";
import { Image } from "./image.model";

export interface AnimalImageRelation {
    animalid: number;
    imageid: number;
    animal: Animal;
    image: Image;
}