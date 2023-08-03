addLayer("meta-navigation", {
    name: "Meta Navigation",
    symbol: "MN",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    color: "rgba(255, 255, 255, 0.25)",
    requires: new Decimal(10),
    resource: "useless paperclips",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "none",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    row: "side",
    hotkeys: [
    ],
    doReset(resettingLayer) {
        if(layers[resettingLayer].row <= this.row) return;

        let keep = [];
        layerDataReset(this.layer, keep);
    },
    tabFormat: {
        "Main": {
            content: [
                "blank",
                "clickables",
                "blank",
            ],
            unlocked() {return false},
        },
    },
    hotkeys: [
        {
            key: "ctrl+s",
            description: "CTRL + S: Save game",
            onPress(){save()},
        },
        {
            key: "ctrl+<",
            description: "CTRL + <: Switch to regular tree",
            onPress(){clickClickable('meta-navigation', 11)},
            unlocked(){return tmp[this.layer].layerShown},
        },
        {
            key: "ctrl+>",
            description: "CTRL + >: Switch to meta progression tree",
            onPress(){clickClickable('meta-navigation', 12)},
            unlocked(){return tmp[this.layer].layerShown},
        },
    ],
    layerShown(){return player.b.best.gte(3) || player.add.best.gte(1) || player.sub.best.gte(1)},
    clickables: {
        11: {
            title: "Switch to Regular Tree",
            canClick: true,
            onClick() {
                player.navTab = "tree-tab";
            },
        },
        12: {
            title: "Switch to Meta-Progression Tree",
            canClick: true,
            onClick() {
                player.navTab = "meta-tab";
            },
        },
    },
})
addLayer("add", {
    name: "NG+",
    symbol: "NG+",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    color: "#5555CC",
    requires: new Decimal("1e3"),
    resource: "Additions",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "static",
    exponent: 2,
    base: 1000,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    row: 1000,
    hotkeys: [
        {
            key: "+",
            description: "+: Reset for additions",
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
                [
                    "display-text",
                    function() {
                        let text = "Current Mode: NG+"+formatWhole(player.add.points)+"<br><br>Modes Currently Enabled:<br><br>";

                        if(player.add.points.gte(1)) text += "NG+<br>- Prestige Points are affected by their own upgrades<br>- Unlock a new row of Prestige Upgrades<br>";
                        if(player.add.points.gte(1) && player.sub.points.gte(3)) text += "- Since you are in at least NG-3 though, Prestige Requirement is <i>also</i> affected by Prestige Upgrades. 🤣<br><br>";
                        
                        if(player.add.points.gte(2)) text += "NG++<br>- Booster effect multiplies Generator Power gain<br>- Unlock Generator Milestones<br>";
                        return text;
                    }
                ],
                "blank",
            ],
            unlocked() {return false},
        },
    },
    layerShown(){return (player.b.best.gte(3) || player[this.layer].best.gte(1) || player.sub.best.gte(1)) && player.navTab === 'meta-tab'},
})
addLayer("sub", {
    name: "NG-",
    symbol: "NG-",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    color: "#CC5555",
    requires: new Decimal("2.5e4"),
    resource: "Subtractions",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "static",
    exponent: 2,
    base: 10,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    row: 1001,
    hotkeys: [
        {
            key: "-",
            description: "-: Reset for subtractions",
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
                [
                    "display-text",
                    function() {
                        let text = "Current Mode: NG-"+formatWhole(player.sub.points)+"<br><br>Modes Currently Enabled:<br><br>";

                        if(player.sub.points.gte(1)) text += "NG-<br>- Divide Prestige Point gain by 2<br>- Booster effect is halfed but is always at least 1<br>- Unlock Generators<br><br>";

                        if(player.sub.points.gte(2)) text += "NG--<br>- Prestige Upgrade costs are multiplied by Prestige Upgrades in the same row<br>- Booster costs are multiplied by Boosters<br>- Unlock Achievements<br><br>";

                        if(player.sub.points.gte(3)) text += "NG-3<br>- You gain 25% less Boosters and Generators<br>- You can only Prestige if you would gain at least 2 Prestige points on reset<br><br>";
                        return text;
                    }
                ],
                "blank",
            ],
            unlocked() {return false},
        },
    },
    branches: ["add"],
    layerShown(){return (player.b.best.gte(5) || player[this.layer].best.gte(1)) && player.navTab === 'meta-tab'},
})