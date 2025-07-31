class Item {
    constructor(name, attack, range, tier, isMelee) {
        this.attack = attack
        this.range = range
        this.tier = tier
        this.name = name
        this.isMelee = isMelee
    }

    attack() {
        if(this.isMelee) {
            this.meleeAttack()
        }
    }

    meleeAttack() {
        
    }
}
