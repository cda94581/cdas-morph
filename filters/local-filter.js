// Import & Setup
const fs = require('fs-extra');
const glob = require('glob');

function manifest() {
	// Generates manifest.json file
	const desc = `§lRead the Description before using§r
Morph into any mob that you kill!
Morphing will have bugs; please report any and all bugs.

§lMade by §ccda94581§r

If you have issues, contact me at the links found in the description of https://mcpedl.com/cdas-morph/ Spamming angry emojis doesn't help me help you. Before you say something along the lines of "Please add..." on a place other than MCPEDL, again, contact me at the links found at the website above. I can't help you on MCPE Add-ons, I can't help you on whatever other weird website this has popped up to. I can only help you on MCPEDL and the links I posted in the description.

§lChangelog v0.0.8§
v0.0.8 - 2021/12/24 (YYYY/MM/DD)
Updated Properly for 1.18.0
Added Loot Tables for the following mobs (#13):
	Axolotl
	Bat
	Ender Dragon (as WIP)
	NPC
	Villager
	Wandering Trader
Added Recipes for the following mobs (#85):
	Agent - Dirt
	Axolotl - Water Bucket
	Bat - Stone
	Cat - String
	Cave Spider - Spider Eye
	Chicken - Feather
	Cod - Cod
	Cow - Leather
	Dolphin - Cod
	Donkey - Leather
	Ender Dragon - Dragon Egg (You'll get it back) - Unavailable ATM
	Enderman - Ender Pearl
	Fox - Sweet Berry
	Glow Squid - Glow Ink Sac
	Goat - Stone (Temporary)
	Horse - Leather
	Iron Golem - Iron Ingot
	Llama - Leather
	Mooshroom - Leather
	Mule - Leather
	NPC - Dirt
	Ocelot - String
	Panda - Bamboo
	Parrot - Feather
	Pig - Porkchop
	Piglin - Gold Nugget
	Polar Bear - Cod
	Pufferfish - Pufferfish
	Rabbit - Rabbit Hide
	Salmon - Salmon
	Sheep - Wool
	Skeleton Horse - Bone
	Snow Golem - Snowball
	Spider - Spider Eye
	Squid - Ink Sac
	Strider - String
	Tropical Fish - Tropical Fish
	Turtle - Seagrass
	Villager - Emerald
	Wandering Trader - Emerald
	Wither - Nether Star (You'll get it back)
	Zombified Piglin - Gold Nugget`;
	const name = 'Cda\'s Morph v0.0.8';
	const version = [ 0, 0, 8 ];
	const minV = [ 1, 18, 0 ];
	const meta = {
		authors: [ 'cda94581' ],
		license: 'CC-BY-SA-4.0',
		url: 'https://cda94581.github.io/downloads/bps#_2021-03-16'
	}
	const rpM = {
		format_version: 2,
		header: {
			description: desc,
			name: name + ' [RP]',
			uuid: 'bbc91fc1-aff3-457b-bf2c-cbec330fd188',
			min_engine_version: minV,
			version: version
		},
		modules: [{
			type: 'resources',
			uuid: 'b30e8905-d1ad-4f51-99e1-392998d886db',
			version: version
		}],
		dependencies: [{
			uuid: '252c6750-6c0a-4131-8e86-201b6aa37605',
			version: version
		}],
		metadata: meta
	}
	const bpM = {
		format_version: 2,
		header: {
			description: desc,
			name: name + ' [BP]',
			uuid: '252c6750-6c0a-4131-8e86-201b6aa37605',
			min_engine_version: minV,
			version: version
		},
		modules: [{
			type: 'data',
			uuid: 'bbc91fc1-aff3-457b-bf2c-cbec330fd188',
			version: version
		}],
		dependencies: [{
			uuid: 'bbc91fc1-aff3-457b-bf2c-cbec330fd188',
			version: version
		}],
		metadata: meta,
		subpacks: [
			{
				folder_name: 'none',
				name: 'No Way to Obtain in Survival',
				memory_tier: 0
			},
			{
				folder_name: 'recipes',
				name: 'Only Recipes',
				memory_tier: 1
			},
			{
				folder_name: 'lts',
				name: 'Only Loot Tables',
				memory_tier: 2
			},
			{
				folder_name: 'both',
				name: 'Recipes & Loot Tables',
				memory_tier: 3
			}
		]
	}

	fs.writeFile('RP/manifest.json', JSON.stringify(rpM), err => { if (err) console.error(err) });
	fs.writeFile('BP/manifest.json', JSON.stringify(bpM), err => { if (err) console.error(err) });

	console.log('Wrote manifest.json files.');
}

function subPacks() {
	// Moves Recipes & Loot Tables into Subpacks
	[ 'none', 'recipes', 'lts', 'both' ].forEach(pack => { fs.ensureDir(`BP/subpacks/${pack}`, err => { if (err) console.error(err); }); });
	fs.copySync('BP/recipes', 'BP/subpacks/both/recipes');
	fs.copySync('BP/recipes', 'BP/subpacks/recipes/recipes');
	fs.copySync('BP/loot_tables', 'BP/subpacks/both/loot_tables');
	fs.copySync('BP/loot_tables', 'BP/subpacks/lts/loot_tables');
	fs.remove('BP/recipes', err => { if (err) console.error(err); });
	fs.remove('BP/loot_tables', err => { if (err) console.error(err); });
	
	console.log('Moved recipes & loot tables to proper subpacks.');

	manifest();
}

function wipRemove() {
	// Remove all ".wip" files
	glob('@(B|R)P/**/*.wip', (err, files) => {
		files.forEach(f => fs.unlinkSync(f) );
		console.log('Removed all .wip files.');

		subPacks();
	});
}

wipRemove();