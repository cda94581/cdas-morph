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

§lChangelog v0.1.0§
v0.1.0 - 2022/03/19 (YYYY/MM/DD)
Updated Properly for 1.18.10
Added Iron Golem Cracking

Welcome to Beta!

Developer Message:
Hey everyone!
It's been a fun year. Over the last 365 of this pack's lifetime, the pack has attained over 260 THOUSAND downloads from the Mediafire links! That was completely unexpected. Anyway, I want to update you a bit about the future of this add-on.
With the release of Cda's Morph Beta 0.1.0, I feel like there are so many parts overall that have accumulated to me being unhappy with the project overall. Therefore, I want to make a compromise and a deal. For the next few months, this will be the last update.
I get what this means. The pack will likely not be updating for the next few updates, and so may fall outdated. It may still *work*, but unfortunately it may not work as properly as it should. Additionally, with the 1.19 Wild Update creeping up, this means that the new mobs such as Frogs, Tadpoles, and the Warden will not be implemented.

Why am I halting?
Simply put, this project has ended up somewhere I am not happy with. So many workarounds, bugs, issues, etc. Even from its first release, the project was rushed. Over time, I ended up sacrificing quality for quantity. Mob abilities were never implemented properly, and so many mobs had issues with themselves. So, I have a new plan.

I'm technically not halting.
You just aren't seeing it. Over the last year, a plethora of new features have made their way into Minecraft. With these features, I plan to completely revamp Morph. The items and subpacks, which caused TONS of issues, will be no more. It will also end up more similar to its Java counterpart. But it takes time.
It's why there likely won't be any more updates. I want to dedicate all my time spent developing Morph, on this single revamp.

Thank you for enjoying Cda's Morph for a year, and I hope you all have another great day.
-cda`;
	const name = 'Cda\'s Morph v0.1.0';
	const version = [ 0, 1, 0 ];
	const minV = [ 1, 18, 10 ];
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