import { AnimalImageRelation } from "./animal-image-relation.model";
import { HabitatImageRelation } from "./habitat-image-relation.model";

export interface Image {
    imageid: number;
    imagedata: Uint8Array | string;
    animalimagerelation: AnimalImageRelation[];
    habitatimagerelation: HabitatImageRelation[];
  }