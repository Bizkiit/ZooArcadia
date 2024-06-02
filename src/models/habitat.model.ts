import { Animal } from "./animal.model";
import { HabitatImageRelation } from "./habitat-image-relation.model";

export interface Habitat {
    habitatid: number;
    name: string;
    description: string;
    comment: string;
    animal?: Animal[];
    habitatimagerelation: HabitatImageRelation[];
}