addLayer("g", {
    name: "generator",
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
    resource: "generators",
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
        layerDataReset(this.layer, keep);
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {return "You have spent "+formatTime(player[this.layer].resetTime)+" since the last "+tmp[this.layer].name+" reset"}],
                ["display-text", function() {return "You have "+format(player[this.layer].power)+" generator power, multiplying point gain by x"+format(tmp[this.layer].effect2)}],
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
    effect() {return player[this.layer].points.max(0).pow_base(2).sub(1)},
    effect2() {return player.g.power.add(1).root(4)},
    update(diff) {
        if(tmp[this.layer].layerShown) player.g.power = player.g.power.add(this.effect().mul(diff))
    },
    effectDescription() {return "generating "+format(this.effect())+" generator power every second"},
    layerShown(){return (upgradeRow('p', [1]) >= 4 || player[this.layer].best.gte(1)) && player.navTab === 'tree-tab'},
})