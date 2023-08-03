addLayer("ach", {
    name: "Achievements",
    symbol: "A",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        resetTime: 0,
    }},
    color: "#FFCC00",
    requires: new Decimal(10),
    resource: "prestige points",
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
        // does not get reset
    },
    tabFormat: {
        "Main": {
            content: [
                "blank",
                ["display-text", function() {return "You have "+formatWhole(player.ach.achievements.length)+" Achievements"}],
                "blank",
                "blank",
                "achievements",
                "blank",
            ],
            unlocked() {return false},
        },
    },
    layerShown(){return player.sub.best.gte(2)},
    achievements: {
        11: {
            name: "Downgrade?",
            tooltip: "Get 1 Prestige Upgrade in NG--<br>Reward: Every achievement in this row increases point gain by 1",
            done() {return player.sub.points.gte(2) && upgradeRow('p', [1, 2]).gte(1)},
            unlocked() {return player.sub.points.gte(2)},
        },
        12: {
            name: "All of the Downgrades.",
            tooltip: "Get 4 Prestige Upgrades in NG--<br>",
            done() {return player.sub.points.gte(2) && upgradeRow('p', [1, 2]).gte(4)},
            unlocked() {return player.sub.points.gte(2)},
        },
        13: {
            name: "Really, all of the Downgrades.",
            tooltip: "Get 8 Prestige Upgrades in NG--<br>Reward: Unlock Booster Upgrades 🧌",
            done() {return player.sub.points.gte(2) && upgradeRow('p', [1, 2]).gte(8)},
            unlocked() {return player.sub.points.gte(2)},
        },
        14: {
            name: "Downgrades again.",
            tooltip: "Reach NG---<br>",
            done() {return player.sub.points.gte(3)},
            unlocked() {return player.sub.points.gte(2)},
        },

        21: {
            name: "Why!?",
            tooltip: "Reach 40 Points in NG-3",
            done() {return player.sub.points.gte(3) && player.points.gte(40)},
            unlocked() {return player.sub.points.gte(3)},
        },
        22: {
            name: "You didn't have to do this.",
            tooltip: "Reach 2 Prestige Points and 3 Prestige Upgrades in NG-3<br>Reward: Double Point Gain",
            done() {return player.sub.points.gte(3) && player.p.points.gte(2) && upgradeRow('p', [1]).gte(3)},
            unlocked() {return player.sub.points.gte(3)},
        },
        23: {
            name: "I'M FINALLY OUT OF THIS NIGHTMARE!!! Wait, what's that?",
            tooltip: "Reach NG-3+<br>Reward: Here's a hint: Read the NG+ effect again.",
            done() {return player.sub.points.gte(3) && player.add.points.gte(1)},
            unlocked() {return player.sub.points.gte(3)},
        },
        24: {
            name: "Not good enough.",
            tooltip: "Buy 8 Prestige Upgrades in NG-3<br>Reward: Unlock Time Capsules",
            done() {return player.sub.points.gte(3) && upgradeRow('p', [1, 2]).gte(8)},
            unlocked() {return player.sub.points.gte(3)},
        },

        31: {
            name: "What are these? Generators?",
            tooltip: "Reach 1 Time Capsule",
            done() {return player.t.points.gte(1) && hasAchievement('ach', 24)},
            unlocked() {return hasAchievement('ach', 24)},
        },
        32: {
            name: "Ok this is too grindy",
            tooltip: "Reach 2,500,000 Prestige Points<br>Reward: Time Capsules increase Generator effect and multiply Prestige Point gain",
            done() {return player.p.points.gte("2.5e6") && hasAchievement('ach', 24)},
            unlocked() {return hasAchievement('ach', 24)},
        },
        33: {
            name: "I promise you're actually out of this nightmare!",
            tooltip: "Reach 6 generators in NG-3<br>",
            done() {return player.g.points.gte("6") && hasAchievement('ach', 24)},
            unlocked() {return hasAchievement('ach', 24)},
        },
        34: {
            name: "Oh no... [nerf intensifies]",
            tooltip: "Reach NG-4<br>",
            done() {return player.sub.points.gte(4)},
            unlocked() {return hasAchievement('ach', 24)},
        },
    },
})