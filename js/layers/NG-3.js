addLayer("t", {
    name: "time capsules",
    symbol: "T",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        power: new Decimal(0),
        resetTime: 0,
    }},
    color: "#007722",
    requires: new Decimal(5000),
    resource: "time capsules",
    baseResource: "prestige points",
    baseAmount() {return player.p.points},
    type: "static",
    exponent: 1.5,
    base: 5,
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
        return mult
    },
    row: 2,
    hotkeys: [
        {
            key: "t",
            description: "T: Reset for time capsules",
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
                ["display-text", function() {return "You have "+format(player[this.layer].power)+" time energy, multiplying point gain by x"+format(tmp[this.layer].effect2)}],
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
    branches: ["b", "g"],
    effect() {return player[this.layer].points.max(0).pow_base(5).sub(1)},
    effect2() {return player.t.power.add(1).root(2)},
    update(diff) {
        player.t.power = player.t.power.add(this.effect().mul(diff))
    },
    effectDescription() {return "generating "+format(this.effect())+" time enrgy every second"},
    layerShown(){return ((hasAchievement('ach', 24) && player.b.best.max(player.g.best).gte(1)) || player[this.layer].best.gte(1)) && player.navTab === 'tree-tab'},
})