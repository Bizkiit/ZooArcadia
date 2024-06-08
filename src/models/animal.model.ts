import { AnimalFeeding } from "./animal-feeding";
import { AnimalImageRelation } from "./animal-image-relation.model";
import { Habitat } from "./habitat.model";
import { Race } from "./race.model";
import { RapportVeterinaire } from "./rapport-veterinaire.model";

export interface Animal {
    animalid: number;
    rapportveterinaireid: number;
    habitatid?: number;
    name?: string;
    status?: string;
    raceid?: number;
    race?: Race;
    habitat?: Habitat;
    rapportveterinaire?: RapportVeterinaire | null;
    animalimagerelation?: AnimalImageRelation[];
    animalfeeding?: AnimalFeeding[];
  }
