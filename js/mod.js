let modInfo = {
	name: "NG+Tree",
	id: "omgitsthenonymous-NG+tree-184639150265464899",
	author: "Thenonymous",
	pointsName: "points",
	modFiles: [
		"layers/meta.js",
		"layers/NG-0.js",
		"layers/NG-1.js",
		"layers/NG-2.js",
		"layers/NG-3.js",
		"tree.js",
	],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Full Release",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0</h3><br>
		- Added up until NG-3 and NG+2.<br>
		- Added Achievements and Time Capsules.<br>
	<h3>v0.2</h3><br>
		- Extended Demo.<br>
		- Added Generators.<br>
	<h3>v0.1</h3><br>
		- Released as Demo.<br>
		- Added Prestige, Boosters, Additions and Subtractions.<br>`

let winText = `Congratulations on completing the demo! Stay tuned to see when it gets officially released...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return !player.sub.points.gte(4)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	gain = gain.add(upgradeRow('p', [1, 2]))
	gain = gain.add(achievementRow('ach', [1]))
	gain = gain.mul(tmp.b.effect)
	gain = gain.mul(tmp.g.effect2)
	gain = gain.mul(tmp.t.effect2)
	if(hasAchievement('ach', 22)) gain = gain.mul(2)

	// NG-
	if(player.sub.points.gte(1)) gain = gain.div(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		let mode = "Current Mode: NG";
		let i = 0;
		while(new Decimal(i).lt(player.sub.points)) {
			i++;
			mode += "-";
		}
		i = 0;
		while(new Decimal(i).lt(player.add.points)) {
			i++;
			mode += "+";
		}
		return mode;
	},
]

// Determines when the game "ends"
function isEndgame() {
	return player.sub.points.gte(4)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}