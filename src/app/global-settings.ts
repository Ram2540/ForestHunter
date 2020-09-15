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
    // static weaponTimeOfWaitingWeaponDataFromDB = 10000;
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
}