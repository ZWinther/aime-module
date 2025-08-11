// Handlebars helpers

// less than
Handlebars.registerHelper('lst', function( a, b ){
	var next =  arguments[arguments.length-1];
	return (a < b) ? next.fn(this) : next.inverse(this);
});
// greater than
Handlebars.registerHelper('grt', function( a, b ){
	var next =  arguments[arguments.length-1];
	return (a > b) ? next.fn(this) : next.inverse(this);
});
// equal than
Handlebars.registerHelper('eqt', function( a, b ){
	var next =  arguments[arguments.length-1];
	return (a == b) ? next.fn(this) : next.inverse(this);
});
Hooks.on('init', async function () {
	// CONFIG CHANGES
	Object.assign(CONFIG.DND5E.limitedUsePeriods, {
		jrny: { label: "AIME.Journey", abbreviation: "AIME.JourneyAbbr" },
		adv: { label: "AIME.Adventure", abbreviation: "AIME.AdventureAbbr" }
	});

	delete CONFIG.DND5E.consumableTypes.scroll;
	delete CONFIG.DND5E.consumableTypes.wand;
	delete CONFIG.DND5E.consumableTypes.rod;

	CONFIG.DND5E.currencies = {
	gp: {
		label: "AIME.CoinsGP",
		abbreviation: "AIME.CoinsAbbrGP",
		conversion: 1
	},
	sp: {
		label: "AIME.CoinsSP",
		abbreviation: "AIME.CoinsAbbrSP",
		conversion: 20
	},
	cp: {
		label: "AIME.CoinsCC",
		abbreviation: "AIME.CoinsAbbrCC",
		conversion: 240
	}
	};

	delete CONFIG.DND5E.skills.arc;
	delete CONFIG.DND5E.skills.rel;
	delete CONFIG.DND5E.skills.ins;

	Object.assign(CONFIG.DND5E.skills, {
		ins: { label: "AIME.SkillIns", aability: "wis", fullKey: "insight"},
		lor: { label: "AIME.SkillLor", aability: "int", fullKey: "lore" },
		rid: { label: "AIME.SkillRid", aability: "int", fullKey: "riddle" },
		lor: { label: "AIME.SkillSha", aability: "int", fullKey: "shadow-lore" },
		tra: { label: "AIME.SkillTra", aability: "int", fullKey: "tradition" }
	});

	Object.assign(CONFIG.DND5E.abilities, {
		sha: { label: "AIME.AbilitySha", abbreviation: "AIME.AbilityShaAbbr", fullKey: "shadow", type: "mental", defaults: { character: 0 }, improvement: false },
		perm: { label: "AIME.AbilityPerm", abbreviation: "AIME.AbilityPermAbbr", fullKey: "permanent", type: "mental", defaults: { character: 0 }, improvement: false }
	});

	CONFIG.DND5E.languages = {
		standard: {
			label: "AIME.Language.Category.Good",
			selectable: false,
			children: {
				common: "AIME.LanguagesCommon",
				ancient: "AIME.LanguagesQuenya",
				sindarin: "AIME.LanguagesSindarin",
				dalish: "AIME.LanguagesDalish",
				vale: "AIME.LanguagesVale",
				dwarvish: "AIME.LanguagesDwarvish",
				woodland: "AIME.LanguagesWoodland",
				rohan: "AIME.LanguagesRohan",

			}
		},
		exotic: {
			label: "AIME.Language.Category.Evil",
			selectable: false,
			children: {
				blackspeech: "AIME.LanguagesBlackSpeech",
				orkish: "AIME.LanguagesOrkish"
			}
		}
	};

	game.settings.register("aime", "spellbookToggle", {
		name: `${game.i18n.localize("AIME.Settings.SpellbookToggle.name")}`,
		hint: game.i18n.localize("AIME.Settings.SpellbookToggle.hint"),
		scope: "user",
		config: true,
		default: false,
		type: Boolean
	});
    game.settings.register("aime", "specialTraitsToggle", {
		name: `${game.i18n.localize("AIME.Settings.specialTraitsToggle.name")}`,
		hint: game.i18n.localize("AIME.Settings.specialTraitsToggle.hint"),
		scope: "user",
		config: true,
		default: false,
		type: Boolean
	});
	foundry.applications.handlebars.loadTemplates([
		'modules/aime/templates/aime-miserable.hbs',
		'modules/aime/templates/aime-summary.hbs',
		'modules/aime/templates/aime-living-standard.hbs'
	]);
});
function formatText(value) {
	return new Handlebars.SafeString(value?.replaceAll("\n", "<br>") ?? "");
}

Hooks.on('renderCharacterActorSheet', async function (app, html, data) {
	const actor = data.actor;
	const misBox2 = "/modules/aime/templates/aime-miserable.hbs"
	const misHtml2 = await foundry.applications.handlebars.renderTemplate(misBox2, actor);
	const inspDiv2 = $(html).find("button.inspiration");
	inspDiv2.after(misHtml2);

	const bio2 = "/modules/aime/templates/aime-summary.hbs"
	const bioHtml2 = await foundry.applications.handlebars.renderTemplate(bio2, data);
	const bioDiv2 = $(html).find('ul.characteristics');
	bioDiv2.append(bioHtml2);

	const aimeScores = $(html).find('.ability-score[data-ability="sha"], .ability-score[data-ability="perm"]');
	aimeScores.each(function() {
		const aimeScoreLabel = $(this).find('a');
		const aimeScoreOldMod = $(this).find('.mod');
		const aimeScore = $(this).find('.score');
		let aimeScoreNewMod;
		if (aimeScore[0]?.innerHTML.includes('input')) {
			aimeScoreNewMod = aimeScore.find('input').val();
		} else {
			aimeScoreNewMod = aimeScore.text();
		}
		const aimeModHtml = `<div class="mod">${aimeScoreNewMod}</div>`;
		aimeScoreLabel.removeClass("rollable");
		aimeScoreOldMod.replaceWith(aimeModHtml);
	});
	if (game.settings.get("aime", "spellbookToggle")) {
		$(html).find('*[data-tab="spells"]').remove()
	};
	if (game.settings.get("aime", "specialTraitsToggle")) {
		$(html).find('[data-tab="specialTraits"] > *:nth-child(2)').hide()
		$(html).find('[data-tab="specialTraits"] > *:nth-child(3)').hide()
	};
	const misButton = $(html).find('button.miserable');
		misButton.on('click', async function() {
			app.submit({ updateData: { "flags.aime.attributes.miserable": !actor.flags.aime.attributes.miserable } });
		});
});
Hooks.on('renderActorSheet5eVehicle', async function (app, html, data) {
	const npcSha = $(html).find('[data-ability="sha"]');
	const npcPerm = $(html).find('[data-ability="perm"]');
	npcSha.remove();
	npcPerm.remove();
});
Hooks.on('renderActorSheet5eNPC2', async function (app, html, data) {
	const npcSha = $(html).find('[data-ability="sha"]');
	const npcPerm = $(html).find('[data-ability="perm"]');
	npcSha.remove();
	npcPerm.remove();
});
