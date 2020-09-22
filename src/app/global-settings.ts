import { weaponUrls } from './enums/imageUrls';

export class GlobalSettings {
    // ------------------------Game-------------------------------------
    static gameNumberOfDamagesPerSecond = 5;
    static gameDelayOfEnemyGereration = 1050;
    // ------------------------END Game-------------------------------------

    // ------------------------Hero-------------------------------------
    static heroUpdatedNotOftenThanEvery = 10000;
    // ------------------------END Hero-------------------------------------

    // ------------------------Weapon-------------------------------------
    static weaponPriceFactor = 0.1; // 0.1 - 10% increase of price for each new level of weapon

    static maxWeaponLevel = 1000;
    // amountOfDifferentWeapons how many picture do I have now, so we can generate the same amount of army
    static amountOfDifferentWeapons = Object.keys(weaponUrls).length;
    static increasingDamageOfNextWeapon = 3.5;
    static increasingPriceOfNextWeapon = 5;

    static everyAmountLevelAdaptationIsApplied = 50; // 100 every 100 level there will be adaptation ration amount of cost and damage
    static adaptationRationForWeapons = 10;
    // ------------------------END Weapon-------------------------------------

    // ------------------------Enemy-------------------------------------
    // draw enemy
    static enemyDrawImageMargin = 70;
    static enemyDrawDellayDrawing = 70;
    static enemyDrawDellayMoving = 70;
    static enemyClickMaxState = 30;
    // animation of image
    static enemyAnimationShiftEnemyMoveX = 2;
    static enemyAnimationMaxShiftX = 20;
    static enemyAnimationShiftEnemyMoveY = 1;
    static enemyAnimationMaxShiftY = 10;
    static enemyAnimationDeathTransarencyChnagePerOneDraw = 0.065;
    // ------------------------END Enemy-------------------------------------
    // ------------------------Gold Reward-------------------------------------
    static startGoldReward = 3;
    static goldMultiplier = 2;
    static minGoldMultiplier = 1.1;
    static periodGoldMultiplierDrop = 5;
    static dropMultiplierEveryPeriod = 0.05; // but not less then minGoldMultiplier
    static finalLevel = 1000;
    // ------------------------END Gold Reward-------------------------------------
    // ------------------------Inventory-------------------------------------
    static equipmentMaxAmountOfItems = 5;   // x * 2 the value will be miltilied by 4
    static inventoryMaxAmountOfItems = 8;   // x * 6 the value will be miltilied by 4
    // ------------------------END Inventory-------------------------------------

}