import type { BaseItem } from "./baseItem";

export interface Session extends BaseItem {
    duration: number;
    score: number | null;
}
