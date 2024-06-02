import { Habitat } from "./habitat.model";
import { Image } from "./image.model";

export interface HabitatImageRelation {
    habitatid: number;
    imageid: number;
    habitat?: Habitat | null;
    image: Image;
}
