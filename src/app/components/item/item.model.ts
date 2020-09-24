import { ElementTypes } from 'src/app/enums/elementTypes';

export class Item {
    itemID: number;
    itemName: string;
    itemType: ItemType;
    itemImgUrl: string;
    itemEffects: ItemEffect[] = [];
    constructor(id: number) {
        this.itemID = id;
      //  this.itemImgUrl = 'https://i.pinimg.com/originals/69/f2/0d/69f20d82197df4b40fec866e18324d39.png';
    }
}



export enum ItemType {
    Ring,
    Weapon,
    Helmet,
    Boots,
    Chest,
    Gloves
}

export class ItemEffect {
    constructor(public value: number, public effectType: ElementTypes) {}
}

// export enum ItemType {
//     Common,
//     Rare,
//     Legendary
// }
