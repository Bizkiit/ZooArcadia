import { Animal } from "./animal.model";

export interface Race {
    raceid: number;
    label: string;
    description: string;
    animal?: Animal [];
}