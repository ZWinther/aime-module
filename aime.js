// Remind users to install/enable libwrapper
Hooks.once('ready', () => {
    if(!game.modules.get('lib-wrapper')?.active && game.user.isGM)
        ui.notifications.error("Adventures in Middle-Earth requires the 'libWrapper' module. Please install and activate it.");
});

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
		common: "AIME.LanguagesCommon",
		blackspeech: "AIME.LanguagesBlackSpeech",
		ancient: "AIME.LanguagesQuenya",
		sindarin: "AIME.LanguagesSindarin",
		dalish: "AIME.LanguagesDalish",
		vale: "AIME.LanguagesVale",
		dwarvish: "AIME.LanguagesDwarvish",
		woodland: "AIME.LanguagesWoodland",
		rohan: "AIME.LanguagesRohan",
		orkish: "AIME.LanguagesOrkish"
	};

	game.settings.register("aime", "spellbookToggle", {
		name: `${game.i18n.localize("AIME.Settings.SpellbookToggle.name")}`,
		hint: game.i18n.localize("AIME.Settings.SpellbookToggle.hint"),
		scope: "user",
		config: true,
		default: false,
		type: Boolean
	});
    loadTemplates([
		'modules/aime/templates/aime-miserable-box2.hbs',
		'modules/aime/templates/aime-summary2.hbs',
		'modules/aime/templates/aime-living-standard.hbs'
	]);
});

Hooks.on('renderActorSheet5eCharacter2', async function (app, html, data) {
	const actor = data.actor;
	const sheet5e = app.options.classes;
	if (sheet5e.includes("dnd5e2", "character")) {
		const misBox2 = "/modules/aime/templates/aime-miserable-box2.hbs"
		const misHtml2 = await renderTemplate(misBox2, actor);
		const inspDiv2 = $(html).find("button.inspiration");
		inspDiv2.after(misHtml2);

		const bio2 = "/modules/aime/templates/aime-summary2.hbs"
		const bioHtml2 = await renderTemplate(bio2, data);
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
				console.log(aimeScoreNewMod);
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
	}
	// if (sheet5e === "dnd5e,sheet,actor,character") {
	// const misBox = "/modules/aime/templates/aime-miserable-box.hbs"
	// const misHtml = await renderTemplate(misBox, actor);
	// var inspDiv = $(html).find(".flexrow.inspiration");
	// inspDiv[0].outerHTML = misHtml;

    //     const scoreBox = "/modules/aime/templates/aime-scores-end.hbs"
    //     const scoreHtml = await renderTemplate(scoreBox, data);
    //     var abiScores = $(html).find(".ability-scores.flexrow");
    //     var endScores = $(html).find( ".ability-scores.flexrow li" ).slice(6);
    //     endScores.remove()
	// abiScores.append(scoreHtml)

    //     const livingBox = "/modules/aime/templates/aime-living-standard.hbs"
    //     const livingHtml = await renderTemplate(livingBox, actor);
    //     var alignment = $(html).find('*[name="system.details.alignment"]').parent()[0];
    //     alignment.innerHTML = livingHtml;

    //     //Remove spellbook tab if setting is enabled
	// if (game.settings.get("aime", "spellbookToggle")) {
    //     	$(html).find('*[data-tab="spellbook"]').remove()
	// };

    //     $(html).find(".dnd5e.sheet.actor.character").css("min-height", "823px");
    // }
    // 	if (sheet5e === "dnd5e,sheet,actor,npc") {
    // 		var npcSha = $(html).find('[data-ability="sha"]');
    // 		var npcPerm = $(html).find('[data-ability="perm"]');
    //     	$(html).find('*[name="system.details.alignment"]').parent().remove()
    //     	npcSha.remove();
    //     	npcPerm.remove();
    //     }
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

// 	Hooks.on("renderTidy5eSheet", async (app, html, data) => {
// 		const actor = data.actor;
// 		const tidyGP = "/modules/aime/templates/aime-tidy5e-gp.hbs"
// 		const tidyGPRender =  await renderTemplate(tidyGP, data);
// 		const tidySP = "/modules/aime/templates/aime-tidy5e-sp.hbs"
// 		const tidySPRender =  await renderTemplate(tidySP, data);
// 		const tidyCP = "/modules/aime/templates/aime-tidy5e-cp.hbs"
// 		const tidyCPRender =  await renderTemplate(tidyCP, data);
// 		const livingBox = "/modules/aime/templates/aime-tidy5e-standard.hbs"
// 		const livingHtml = await renderTemplate(livingBox, actor);
// 		const tidyMisBox = "/modules/aime/templates/aime-tidy5e-miserable.hbs"
// 		const tidyMisHtml = await renderTemplate(tidyMisBox, actor);
// 		let tidyBG = $(html).find('[data-input*="background"]');
// 		let tidySummaryDel = $(html).find( '[data-target*="alignment"], [data-input*="alignment"]' );
// 		let tidyInspiration = $(html).find('.inspiration');

		
		
// 		// Add new fields to character summary
// 		tidySummaryDel.remove();
// 		tidyBG.after(livingHtml);

// 		// Remove mod/save box from new scores
// 		var tidySha = $(html).find('[data-ability="sha"]').find('.value-footer');
// 		var tidyPerm = $(html).find('[data-ability="perm"]').find('.value-footer');
// 		var tidyCogPerm = $(html).find('[data-ability="perm"]').find('.config-button');
// 		var tidyCogSha = $(html).find('[data-ability="sha"]').find('.config-button');
// 		tidySha.remove();
// 		tidyPerm.remove();
// 		tidyCogSha.remove();
// 		tidyCogPerm.remove();

// 		// Add Miserable button next to Inspiration button
// 		tidyInspiration.after(tidyMisHtml);

// 		//Remove spellbook tab if setting is enabled
// 		if (game.settings.get("aime", "spellbookToggle")) {
// 			$(html).find('[data-tab="spellbook"]').remove()	
// 		};

// 		// Change currency abbreviations
// 		var tidyGPReplace = $(html).find('.denomination.gp')[0];
// 		tidyGPReplace.innerHTML = tidyGPRender;
// 		var tidySPReplace = $(html).find('.denomination.sp')[0];
// 		tidySPReplace.innerHTML = tidySPRender;
// 		var tidyCPReplace = $(html).find('.denomination.cp')[0];
// 		tidyCPReplace.innerHTML = tidyCPRender;

// 		html.find('[contenteditable]').on('paste', function(e) {
// 			//strips elements added to the editable tag when pasting
// 			let $self = $(this);
		
// 			// set maxlength
// 			let maxlength = 40;
// 			if($self[0].dataset.maxlength){
// 			  maxlength = parseInt($self[0].dataset.maxlength);
// 			}
		
// 			setTimeout(function() {
// 			  let textString = $self.text();
// 			  textString = textString.substring(0,maxlength);
// 			  $self.html(textString);
// 			}, 0);
		
// 		  }).on('keypress', function(e) {
// 			let $self = $(this);
		
// 			// set maxlength
// 			let maxlength = 40;
// 			if($self[0].dataset.maxlength){
// 			  maxlength = parseInt($self[0].dataset.maxlength);
// 			}
		
// 			// only accept backspace, arrow keys and delete after maximum characters
// 			let keys = [8,37,38,39,40,46];
		
// 			if($(this).text().length === maxlength && keys.indexOf(e.keyCode) < 0) { 
// 			  e.preventDefault();
// 			}
		
// 			if(e.keyCode===13){
// 			  $(this).blur();
// 			}
// 		  });
		
// 		  html.find('[contenteditable]').blur(async (event) => {
// 			let value = event.target.textContent;
// 			let target = event.target.dataset.target;
// 			html.find('input[type="hidden"][data-input="'+target+'"]').val(value).submit();
// 		  });
// 	});

// Hooks.on("renderTidy5eNPC", async (app, html, data) => {
// 	const tidyNpcCurrency = $(html).find('.inventory-currency');

// 	// If NPC remove Shadow and Perm scores
// 		let npcSha = $(html).find('[data-ability="sha"]');
// 		let npcPerm = $(html).find('[data-ability="perm"]');
// 		npcSha.remove();
// 		npcPerm.remove();
	
// 	// Currency
// 	tidyNpcCurrency.remove();
// });

// Hooks.on("renderTidy5eVehicle", async (app, html, data) => {
// 	const tidyGP = "/modules/aime/templates/aime-tidy5e-gp.hbs"
// 	const tidyGPRender =  await renderTemplate(tidyGP, data);
// 	const tidySP = "/modules/aime/templates/aime-tidy5e-sp.hbs"
// 	const tidySPRender =  await renderTemplate(tidySP, data);
// 	const tidyCP = "/modules/aime/templates/aime-tidy5e-cp.hbs"
// 	const tidyCPRender =  await renderTemplate(tidyCP, data);

// 	// Remove Shadow and Perm scores
// 	let npcSha = $(html).find('[data-ability="sha"]');
// 	let npcPerm = $(html).find('[data-ability="perm"]');
// 	npcSha.remove();
// 	npcPerm.remove();

// 	// Change currency abbreviations
// 	var tidyGPReplace = $(html).find('.denomination.gp')[0];
// 	tidyGPReplace.innerHTML = tidyGPRender;
// 	var tidySPReplace = $(html).find('.denomination.sp')[0];
// 	tidySPReplace.innerHTML = tidySPRender;
// 	var tidyCPReplace = $(html).find('.denomination.cp')[0];
// 	tidyCPReplace.innerHTML = tidyCPRender;

// });
