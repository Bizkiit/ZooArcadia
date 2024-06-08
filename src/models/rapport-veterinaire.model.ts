import { Animal } from "./animal.model";

export interface RapportVeterinaire {
    rapportveterinaireid: number;
    date: Date | undefined;
    detail: string;
    quantity: number;
    foodtype: string;
    status: string;
    animalid: number;
    animal: Animal;
}