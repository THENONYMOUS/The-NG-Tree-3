addLayer("g", {
    name: "Generator",
    symbol: "G",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        power: new Decimal(0),
        resetTime: 0,
    }},
    color: "#22AA00",
    requires: new Decimal(10),
    resource() {return hasAchievement('ach', 54) ? "generaors" : "generators"},
    resource2() {return hasAchievement('ach', 54) ? "generaor poer" : "generator power"},
    baseResource: "prestige points",
    baseAmount() {return player.p.points},
    type: "static",
    exponent: 1.5,
    base: 2.5,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    directMult() {
        mult = new Decimal(1)
        if(player.sub.points.gte(3)) mult = mult.mul(0.75)
        return mult
    },
    row: 1,
    hotkeys: [
        {
            key: "g",
            description: "G: Reset for generators",
            onPress(){if (canReset(this.layer)) doReset(this.layer)},
            unlocked(){return tmp[this.layer].layerShown},
        },
    ],
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;

        let keep = [];
        if(layers[resettingLayer].row < 1000) keep.push("milestones")
        layerDataReset(this.layer, keep);
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {return "You have spent "+formatTime(player[this.layer].resetTime)+" since the last "+tmp[this.layer].name+" reset"}],
                ["display-text", function() {return "You have "+format(player[this.layer].power)+" "+tmp[this.layer].resource2+", multiplying point gain by x"+format(tmp[this.layer].effect2)}],
                "blank",
                "milestones",
                "blank",
                "clickables",
                "blank",
                "buyables",
                "blank",
                "upgrades",
                "blank",
            ],
            unlocked() {return false},
        },
    },
    branches: ["p"],
    effect() {
        let effect = player[this.layer].points.max(0).pow_base(hasAchievement('ach', 32) ? player.t.points : decimalZero.add(2)).sub(1).mul(player.add.points.gte(2) ? tmp.b.effect : 1)
        if(hasAchievement('ach', 53)) effect = effect.mul(player.g.points.min(10)).pow(player.g.points.min(10))
        if(hasAchievement('ach', 54)) effect = player.g.points.pow(10)
        return effect
    },
    effect2() {return player.g.power.add(1).root(4)},
    update(diff) {
        player.g.power = player.g.power.add(this.effect().mul(diff))
    },
    effectDescription() {return "generating "+format(this.effect())+" "+tmp[this.layer].resource2+" every second"},
    layerShown(){return ((upgradeRow('p', [1]) >= 4 && player.sub.points.gte(1)) || player[this.layer].best.gte(1)) && player.navTab === 'tree-tab'},
    milestones: {
        0: {
            requirementDescription: "4 Generators",
            effectDescription: "Auto-buy Prestige Upgrades",
            done() {return player.g.points.gte(4) && player.add.points.gte(2)},
            unlocked() {return player.add.points.gte(2)},
            toggles: [["p", "autoUpg"]],
        },
        1: {
            requirementDescription: "6 Generators",
            effectDescription: "Gain 100% of Prestige Gain every second",
            done() {return player.g.points.gte(6) && player.add.points.gte(2)},
            unlocked() {return player.add.points.gte(2)},
        },
    },
})