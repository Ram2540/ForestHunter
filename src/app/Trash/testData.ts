import { Item, ItemEffect } from '../components/item/item.model';
import { ElementTypes } from '../enums/elementTypes';

export class TestData {
    public getItems(): Item[] {
        const numberOfElements = 20;
        let itemArray: Item[] = [];

        for (let i = 1; i < numberOfElements; i++) {
            const item = new Item(i);

            if (i % 2 === 0 || i % 3 === 0) {
                item.itemEffects.push(new ItemEffect(i, randomEnum(ElementTypes)));
                item.itemEffects.push(new ItemEffect(i, randomEnum(ElementTypes)));
            }
            //item.itemEffects.push(new ItemEffect(i, ElementTypes.Earth));
            if (i % 2 === 0) {
                item.itemImgUrl = 'https://i.pinimg.com/originals/69/f2/0d/69f20d82197df4b40fec866e18324d39.png';
                item.itemName = 'ring of destruction';

            }
            if (i % 3 === 0) {
                item.itemImgUrl = 'https://www.jing.fm/clipimg/full/125-1257532_cartoon-knight-helmet-clipart-middle-ages-knight-helmet.png';
                item.itemName = 'helmet of power';
            }
            itemArray.push(item);
        }

        return itemArray;
    }
}


function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}