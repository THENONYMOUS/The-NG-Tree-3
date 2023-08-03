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
    canReset() {return new Decimal(tmp[this.layer].resetGain).gte(1) && player.points.gte(10)},
    color: "#00AAFF",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        if(player.add.points.gte(1)) mult = mult.add(upgradeRow('p', [1, 2]))
        if(player.sub.points.gte(1)) mult = mult.div(2)
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
            title: "Prestige Upgrade 1-1",
            description: "Increase Point Gain by 1",
            cost: new Decimal(1),
        },
        12: {
            title: "Prestige Upgrade 1-2",
            description: "Increase Point Gain by 1",
            cost: new Decimal(1),
        },
        13: {
            title: "Prestige Upgrade 1-3",
            description: "Increase Point Gain by 1",
            cost: new Decimal(1),
        },
        14: {
            title: "Prestige Upgrade 1-4",
            description: "Increase Point Gain by 1",
            cost: new Decimal(1),
        },

        21: {
            title: "Prestige Upgrade 2-1",
            description: "Increase Point Gain by 1",
            cost: new Decimal(100),
            unlocked() {return player.add.points.gte(1)},
        },
        22: {
            title: "Prestige Upgrade 2-2",
            description: "Increase Point Gain by 1",
            cost: new Decimal(100),
            unlocked() {return player.add.points.gte(1)},
        },
        23: {
            title: "Prestige Upgrade 2-3",
            description: "Increase Point Gain by 1",
            cost: new Decimal(100),
            unlocked() {return player.add.points.gte(1)},
        },
        24: {
            title: "Prestige Upgrade 2-4",
            description: "Increase Point Gain by 1",
            cost: new Decimal(100),
            unlocked() {return player.add.points.gte(1)},
        },
    },
})
addLayer("b", {
    name: "booster",
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
    resource: "boosters",
    baseResource: "prestige points",
    baseAmount() {return player.p.points},
    type: "static",
    exponent: 1.5,
    base: 2,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
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
    effect() {return player[this.layer].points.max(0).pow_base(2)},
    effectDescription() {return "multiplying point gain by x"+format(this.effect())},
    layerShown(){return (upgradeRow('p', [1]) >= 4 || player[this.layer].best.gte(1)) && player.navTab === 'tree-tab'},
})