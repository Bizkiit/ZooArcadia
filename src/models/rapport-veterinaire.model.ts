import { Animal } from "./animal.model";

export interface RapportVeterinaire {
    rapportveterinaireid: number;
    date: Date;
    detail: string;
    animal: Animal;
}