/*
Template

addLayer("p", {
    name: "prestige",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    color: "#00AAFF",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    row: 0,
    hotkeys: [
        {
            key: "p",
            description: "P: Reset for prestige points",
            onPress(){if (canReset(this.layer)) doReset(this.layer)},
            unlocked(){return tmp[this.layer].layerShown},
        },
    ],
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;

        let keep = [];
        layerDataReset(this.layer, keep);
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {return "You have spent "+formatTime(player[this.layer].resetTime)+" since the last "+tmp[this.layer].name+" reset"}],
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
    layerShown(){return (true || player[this.layer].best.gte(1)) && player.navTab === 'tree-tab'},
})
*/
addLayer("p", {
    name: "Prestige",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    canReset() {
        let prestigeReq = new Decimal(1)
        if(player.sub.points.gte(3)) prestigeReq = prestigeReq.add(1)
        if(player.sub.points.gte(3) && player.add.points.gte(1)) prestigeReq = prestigeReq.mul(upgradeRow('p', [1, 2, 3]).add(1))
        if(hasAchievement('ach', 52)) prestigeReq = prestigeReq.div(player.b.points.add(1)).ceil()
        prestigeReq = prestigeReq.max(1)
        return new Decimal(tmp[this.layer].resetGain).gte(prestigeReq) && player.points.gte(10)
    },
    color: "#00AAFF",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    autoUpgrade() {return player.p.autoUpg && hasMilestone('g', 0)},
    passiveGeneration() {
        let gen = new Decimal(0)
        if(hasMilestone('g', 1)) gen = gen.add(1)
        return gen
    },
    gainMult() {
        mult = new Decimal(1)
        if(player.add.points.gte(1)) mult = mult.add(upgradeRow('p', [1, 2, 3]))
        if(player.sub.points.gte(1)) mult = mult.div(2)
        if(hasAchievement('ach', 32)) mult = mult.mul(player.t.points.add(1))
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    row: 0,
    hotkeys: [
        {
            key: "p",
            description: "P: Reset for prestige points",
            onPress(){if (canReset(this.layer)) doReset(this.layer)},
            unlocked(){return tmp[this.layer].layerShown},
        },
    ],
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;

        let keep = [];
        layerDataReset(this.layer, keep);
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {return "You have spent "+formatTime(player[this.layer].resetTime)+" since the last "+tmp[this.layer].name+" reset"}],
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
    layerShown(){return player.navTab === 'tree-tab'},
    upgrades: {
        11: {
            title() {return tmp[this.layer].name+" Upgrade 1-1"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(1).times(player.sub.points.gte(2) ? upgradeRow('p', [1]).add(1) : 1)},
        },
        12: {
            title() {return tmp[this.layer].name+" Upgrade 1-2"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(1).times(player.sub.points.gte(2) ? upgradeRow('p', [1]).add(1) : 1)},
        },
        13: {
            title() {return tmp[this.layer].name+" Upgrade 1-3"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(1).times(player.sub.points.gte(2) ? upgradeRow('p', [1]).add(1) : 1)},
        },
        14: {
            title() {return tmp[this.layer].name+" Upgrade 1-4"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(1).times(player.sub.points.gte(2) ? upgradeRow('p', [1]).add(1) : 1)},
        },

        21: {
            title() {return tmp[this.layer].name+" Upgrade 2-1"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(100).times(player.sub.points.gte(2) ? upgradeRow('p', [2]).add(1) : 1)},
            unlocked() {return player.add.points.gte(1)},
        },
        22: {
            title() {return tmp[this.layer].name+" Upgrade 2-2"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(100).times(player.sub.points.gte(2) ? upgradeRow('p', [2]).add(1) : 1)},
            unlocked() {return player.add.points.gte(1)},
        },
        23: {
            title() {return tmp[this.layer].name+" Upgrade 2-3"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(100).times(player.sub.points.gte(2) ? upgradeRow('p', [2]).add(1) : 1)},
            unlocked() {return player.add.points.gte(1)},
        },
        24: {
            title() {return tmp[this.layer].name+" Upgrade 2-4"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(100).times(player.sub.points.gte(2) ? upgradeRow('p', [2]).add(1) : 1)},
            unlocked() {return player.add.points.gte(1)},
        },

        31: {
            title() {return tmp[this.layer].name+" Upgrade 3-1"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(10).times(upgradeRow('p', [3]).add(1))},
            unlocked() {return player.sub.points.gte(4)},
            currencyInternalName: "points",
            currencyDisplayName: "points",
        },
        32: {
            title() {return tmp[this.layer].name+" Upgrade 3-2"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(10).times(upgradeRow('p', [3]).add(1))},
            unlocked() {return player.sub.points.gte(4)},
            currencyInternalName: "points",
            currencyDisplayName: "points",
        },
        33: {
            title() {return tmp[this.layer].name+" Upgrade 3-3"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(10).times(upgradeRow('p', [3]).add(1))},
            unlocked() {return player.sub.points.gte(4)},
            currencyInternalName: "points",
            currencyDisplayName: "points",
        },
        34: {
            title() {return tmp[this.layer].name+" Upgrade 3-4"},
            description: "Increase Point Gain by 1",
            cost() {return new Decimal(10).times(upgradeRow('p', [3]).add(1))},
            unlocked() {return player.sub.points.gte(4)},
            currencyInternalName: "points",
            currencyDisplayName: "points",
        },
    },
})
addLayer("b", {
    name() {return player.sub.points.gte(4) ? "Boster" : "Booster"},
    symbol: "B",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    color: "#0055FF",
    requires: new Decimal(10),
    resource() {return player.sub.points.gte(4) ? "bosters" : "boosters"},
    baseResource: "prestige points",
    baseAmount() {return player.p.points},
    type: "static",
    exponent: 1.5,
    base: 2,
    gainMult() {
        mult = new Decimal(1)
        if(player.sub.points.gte(2)) mult = mult.mul(player.b.points.add(1))
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
            key: "b",
            description: "B: Reset for boosters",
            onPress(){if (canReset(this.layer)) doReset(this.layer)},
            unlocked(){return tmp[this.layer].layerShown},
        },
    ],
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;

        let keep = [];
        layerDataReset(this.layer, keep);
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {return "You have spent "+formatTime(player[this.layer].resetTime)+" since the last "+tmp[this.layer].name+" reset"}],
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
        let effect = player[this.layer].points.max(0).pow_base(upgradeRow('b', [1]).add(2))
        if(player.sub.points.gte(1)) effect = effect.div(2).max(1)
        return effect
    },
    effectDescription() {return "multiplying point gain by x"+format(this.effect())},
    layerShown(){return (upgradeRow('p', [1]) >= 4 || player[this.layer].best.gte(1)) && player.navTab === 'tree-tab'},
    upgrades: {
        11: {
            title() {return tmp[this.layer].name+" Upgrade 1-1"},
            description: "Increase Booster effect by 1",
            cost() {return upgradeRow('b', [1]).pow(2).add(3)},
            unlocked() {return hasAchievement('ach', 13)},
        },
        12: {
            title() {return tmp[this.layer].name+" Upgrade 1-2"},
            description: "Increase Booster effect by 1",
            cost() {return upgradeRow('b', [1]).pow(2).add(3)},
            unlocked() {return hasAchievement('ach', 13)},
        },
        13: {
            title() {return tmp[this.layer].name+" Upgrade 1-3"},
            description: "Increase Booster effect by 1",
            cost() {return upgradeRow('b', [1]).pow(2).add(3)},
            unlocked() {return hasAchievement('ach', 13)},
        },
        14: {
            title() {return tmp[this.layer].name+" Upgrade 1-4"},
            description: "Increase Booster effect by 1",
            cost() {return upgradeRow('b', [1]).pow(2).add(3)},
            unlocked() {return hasAchievement('ach', 13)},
        },
    },
})