import { ElementTypes } from 'src/app/enums/elementTypes';

export interface HeroStats {
    statName: string;
    value: number;
    isPrcent: boolean;
}

export function getDefaultStatValues(): HeroStats[] {
    const heroStats: HeroStats[] = [];

    for (let e in ElementTypes) {
        if (isNaN(Number(e))) {
        const stat: HeroStats = { statName: e, value: 0, isPrcent: true };
        heroStats.push(stat);
        }
    }
    return heroStats;
}