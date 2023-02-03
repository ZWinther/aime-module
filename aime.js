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
	//DO CONFIG CHANGES
	CONFIG.DND5E.limitedUsePeriods = {
		sr: "DND5E.ShortRest",
		lr: "DND5E.LongRest",
		day: "DND5E.Day",
		charges: "DND5E.Charges",
		jrny: "AIME.Journey",
		adv: "AIME.Adventure"
	};
	// preLocalize("limitedUsePeriods");

	CONFIG.DND5E.consumableTypes = {
		ammo: "DND5E.ConsumableAmmunition",
		potion: "DND5E.ConsumablePotion",
		poison: "DND5E.ConsumablePoison",
		food: "DND5E.ConsumableFood",
		//scroll: "DND5E.ConsumableScroll",
		//wand: "DND5E.ConsumableWand",
		//rod: "DND5E.ConsumableRod",
		trinket: "DND5E.ConsumableTrinket"
	};
	// preLocalize("consumableTypes", { sort: true });

	CONFIG.DND5E.currencies = {
	  gp: {
	    label: "AIME.CoinsGP",
	    abbreviation: "AIME.CoinsAbbrGP"
	  },
	  sp: {
	    label: "AIME.CoinsSP",
	    abbreviation: "AIME.CoinsAbbrSP",
	    conversion: {into: "gp", each: 20}
	  },
	  cp: {
	    label: "AIME.CoinsCC",
	    abbreviation: "AIME.CoinsAbbrCC",
	    conversion: {into: "sp", each: 12}
	  }
	};
	// preLocalize("currencies", { keys: ["label", "abbreviation"] });

	CONFIG.DND5E.skills = {
	  acr: { label: "DND5E.SkillAcr", ability: "dex" },
	  ani: { label: "DND5E.SkillAni", ability: "wis" },
	  // arc: { label: "DND5E.SkillArc", ability: "int" },
	  ath: { label: "DND5E.SkillAth", ability: "str" },
	  dec: { label: "DND5E.SkillDec", ability: "cha" },
	  his: { label: "DND5E.SkillHis", ability: "int" },
	  ins: { label: "AIME.SkillIns", ability: "wis" },
	  itm: { label: "DND5E.SkillItm", ability: "cha" },
	  inv: { label: "DND5E.SkillInv", ability: "int" },
	  lor: { label: "AIME.SkillLor", ability: "int" },
	  med: { label: "DND5E.SkillMed", ability: "wis" },
	  nat: { label: "DND5E.SkillNat", ability: "int" },
	  prc: { label: "DND5E.SkillPrc", ability: "wis" },
	  prf: { label: "DND5E.SkillPrf", ability: "cha" },
	  per: { label: "DND5E.SkillPer", ability: "cha" },
	  rid: { label: "AIME.SkillRid", ability: "int" },
	  // rel: { label: "DND5E.SkillRel", ability: "int" },
	  sha: { label: "AIME.SkillSha", ability: "int" },
	  slt: { label: "DND5E.SkillSlt", ability: "dex" },
	  ste: { label: "DND5E.SkillSte", ability: "dex" },
	  sur: { label: "DND5E.SkillSur", ability: "wis" },
	  tra: { label: "AIME.SkillTra", ability: "int" }
	};
	// preLocalize("skills", { key: "label", sort: true });
	// patchConfig("skills", "label", { since: 2.0, until: 2.2 });

	CONFIG.DND5E.abilities = {
		str: "DND5E.AbilityStr",
		dex: "DND5E.AbilityDex",
		con: "DND5E.AbilityCon",
		int: "DND5E.AbilityInt",
		wis: "DND5E.AbilityWis",
		cha: "DND5E.AbilityCha",
		sha: "AIME.AbilitySha",
		perm: "AIME.AbilityPerm",
	};
	// preLocalize("abilities");

	CONFIG.DND5E.abilityAbbreviations = {
	  str: "DND5E.AbilityStrAbbr",
	  dex: "DND5E.AbilityDexAbbr",
	  con: "DND5E.AbilityConAbbr",
	  int: "DND5E.AbilityIntAbbr",
	  wis: "DND5E.AbilityWisAbbr",
	  cha: "DND5E.AbilityChaAbbr",
	  sha: "DND5E.AbilityShaAbbr",
	  perm: "DND5E.AbilityPermAbbr",
	  hon: "DND5E.AbilityHonAbbr",
	  san: "DND5E.AbilitySanAbbr"
	};
	// preLocalize("abilityAbbreviations");

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
	// preLocalize("languages", { sort: true });

	CONFIG.DND5E.newSkills = [
		{
			skl: "lor",
			ability: "int"
		},
		{
			skl: "rid",
			ability: "int"
		},
		{
			skl: "sha",
			ability: "int"
		},
		{
			skl: "tra",
			ability: "int"
		},
	];
	// preLocalize("newSkills");

	CONFIG.DND5E.newScores = [
		{
			scr: "sha",
			proficient: "0"
		},
		{
			scr: "perm",
			proficient: "0"
		},
	];

	game.settings.register("aime", "spellbookToggle", {
		name: `${game.i18n.localize("AIME.Settings.SpellbookToggle.name")}`,
		hint: game.i18n.localize("AIME.Settings.SpellbookToggle.hint"),
		scope: "user",
		config: true,
		default: false,
		type: Boolean
	});
	const tidy5eModule = game.modules?.get('tidy5e-sheet')?.active;

	if (tidy5eModule === true) {
    		loadTemplates([
    		'modules/aime/templates/aime-tidy5e-standard.hbs',
    		]);
    	}
    loadTemplates([
    	'modules/aime/templates/aime-miserable-box.hbs',
    	'modules/aime/templates/aime-scores-end.hbs',
    	'modules/aime/templates/aime-living-standard.hbs'
	]);

	CONFIG.DND5E.delSkills = ["arc", "rel", "tss", "tst"];

	// Remove PP and EP from showing up on character sheet displays since we don't use them in AiME	
	libWrapper.register("aime", "game.dnd5e.applications.actor.ActorSheet5eCharacter.prototype.getData", async function patchedActorSheet5eCharacter(wrapped, ...args) {

		const data = await wrapped(...args);
		delete data.system.currency.pp;
		delete data.system.currency.ep;

		// Return data to the sheet
		return data
	}, "WRAPPER");

	// Remove PP and EP from showing up on vehicle sheet displays since we don't use them in AiME	
	libWrapper.register("aime", "game.dnd5e.applications.actor.ActorSheet5eVehicle.prototype.getData", async function patchedActorSheet5eCharacter(wrapped, ...args) {

		const data = await wrapped(...args);
		delete data.system.currency.pp;
		delete data.system.currency.ep;

		// Return data to the sheet
		return data
	}, "WRAPPER");

	libWrapper.register("aime", "CONFIG.Actor.documentClass.prototype.prepareDerivedData", function patchedPrepareDerivedData(wrapped, ...args) {
    wrapped(...args);

		    //FIX CUSTOM SKILL ABILITIES
		const source = this._source.system;
		const newScores = CONFIG.DND5E.newScores;
		const scoreData = this.system.abilities;
		const scoreSource = source.abilities;
		const newSkills = CONFIG.DND5E.newSkills;
		const skillData = this.system.skills;
		const skillSource = source.skills;
		const delSkills = ["arc", "rel", "tss", "tst"];

		
		if ( this.type != "vehicle" ) {
		newSkills.forEach(e => {
			let sklName = e["skl"];
			let sklAbility = e["ability"];
			if (typeof (skillData[sklName]) == "undefined") {
				skillData[sklName] = new Object();
				skillData[sklName].value = 0;
				skillData[sklName].ability = sklAbility;
			}
			if (typeof (skillData[sklName].ability) == "undefined") {
				skillData[sklName].ability = [sklAbility];
			}
		});
		newSkills.forEach(e => {
		let sklName = e["skl"];
		let sklAbility = e["ability"];
		if (typeof (skillSource[sklName]) == "undefined") {
			skillSource[sklName] = new Object();
			skillSource[sklName].value = 0;
			skillSource[sklName].ability = sklAbility;
		}
		if (typeof (skillSource[sklName].ability) == "undefined") {
			skillSource[sklName].ability = [sklAbility];
	}
	});
	};

}, "WRAPPER");
});

function i18n(key) {
	return game.i18n.localize(key);
}

Hooks.on('renderActorSheet', async function (app, html, data) {
	const actor = data.actor;
	const sheet5e = app.options.classes.join();
	const sheetTidy = app.options.classes[0];
	const sheetTidyType = app.options.classes[3];

	if (sheet5e === "dnd5e,sheet,actor,character") {
	const misBox = "/modules/aime/templates/aime-miserable-box.hbs"
	const misHtml = await renderTemplate(misBox, actor);
	var inspDiv = $(html).find(".flexrow.inspiration");
	inspDiv[0].outerHTML = misHtml;

        const scoreBox = "/modules/aime/templates/aime-scores-end.hbs"
        const scoreHtml = await renderTemplate(scoreBox, data);
        var abiScores = $(html).find(".ability-scores.flexrow");
        var endScores = $(html).find( ".ability-scores.flexrow li" ).slice(6);
        endScores.remove()
	abiScores.append(scoreHtml)

        const livingBox = "/modules/aime/templates/aime-living-standard.hbs"
        const livingHtml = await renderTemplate(livingBox, actor);
        var alignment = $(html).find('*[name="system.details.alignment"]').parent()[0];
        alignment.innerHTML = livingHtml;

        //Remove spellbook tab if setting is enabled
	if (game.settings.get("aime", "spellbookToggle")) {
        	$(html).find('*[data-tab="spellbook"]').remove()
	};

        $(html).find(".dnd5e.sheet.actor.character").css("min-height", "823px");
    }
    	if (sheet5e === "dnd5e,sheet,actor,npc") {
    		var npcSha = $(html).find('[data-ability="sha"]');
    		var npcPerm = $(html).find('[data-ability="perm"]');
        	$(html).find('*[name="system.details.alignment"]').parent().remove()
        	npcSha.remove();
        	npcPerm.remove();
        }

        if (sheet5e === "dnd5e,sheet,actor,vehicle") {
    		var npcSha = $(html).find('[data-ability="sha"]');
    		var npcPerm = $(html).find('[data-ability="perm"]');
        	npcSha.remove();
        	npcPerm.remove();
        }

        // MonsterBlock Compatibility
        if (sheetTidy === "monsterblock") {
	        	var npcSha = $(html).find('[data-ability="sha"]');
	    		var npcPerm = $(html).find('[data-ability="perm"]');
	        	npcSha.remove();
	        	npcPerm.remove();
	    }
    });

	Hooks.on("renderTidy5eSheet", async (app, html, data) => {
		const actor = data.actor;
		const tidyGP = "/modules/aime/templates/aime-tidy5e-gp.hbs"
		const tidyGPRender =  await renderTemplate(tidyGP, data);
		const tidySP = "/modules/aime/templates/aime-tidy5e-sp.hbs"
		const tidySPRender =  await renderTemplate(tidySP, data);
		const tidyCP = "/modules/aime/templates/aime-tidy5e-cp.hbs"
		const tidyCPRender =  await renderTemplate(tidyCP, data);
		const livingBox = "/modules/aime/templates/aime-tidy5e-standard.hbs"
		const livingHtml = await renderTemplate(livingBox, actor);
		const tidyMisBox = "/modules/aime/templates/aime-tidy5e-miserable.hbs"
		const tidyMisHtml = await renderTemplate(tidyMisBox, actor);
		let tidyBG = $(html).find('[data-input*="background"]');
		let tidySummaryDel = $(html).find( '[data-target*="alignment"], [data-input*="alignment"]' );
		let tidyInspiration = $(html).find('.inspiration');

		
		
		// Add new fields to character summary
		tidySummaryDel.remove();
		tidyBG.after(livingHtml);

		// Remove mod/save box from new scores
		var tidySha = $(html).find('[data-ability="sha"]').find('.value-footer');
		var tidyPerm = $(html).find('[data-ability="perm"]').find('.value-footer');
		var tidyCogPerm = $(html).find('[data-ability="perm"]').find('.config-button');
		var tidyCogSha = $(html).find('[data-ability="sha"]').find('.config-button');
		tidySha.remove();
		tidyPerm.remove();
		tidyCogSha.remove();
		tidyCogPerm.remove();

		// Add Miserable button next to Inspiration button
		tidyInspiration.after(tidyMisHtml);

		//Remove spellbook tab if setting is enabled
		if (game.settings.get("aime", "spellbookToggle")) {
			$(html).find('[data-tab="spellbook"]').remove()	
		};

		// Change currency abbreviations
		var tidyGPReplace = $(html).find('.denomination.gp')[0];
		tidyGPReplace.innerHTML = tidyGPRender;
		var tidySPReplace = $(html).find('.denomination.sp')[0];
		tidySPReplace.innerHTML = tidySPRender;
		var tidyCPReplace = $(html).find('.denomination.cp')[0];
		tidyCPReplace.innerHTML = tidyCPRender;

		html.find('[contenteditable]').on('paste', function(e) {
			//strips elements added to the editable tag when pasting
			let $self = $(this);
		
			// set maxlength
			let maxlength = 40;
			if($self[0].dataset.maxlength){
			  maxlength = parseInt($self[0].dataset.maxlength);
			}
		
			setTimeout(function() {
			  let textString = $self.text();
			  textString = textString.substring(0,maxlength);
			  $self.html(textString);
			}, 0);
		
		  }).on('keypress', function(e) {
			let $self = $(this);
		
			// set maxlength
			let maxlength = 40;
			if($self[0].dataset.maxlength){
			  maxlength = parseInt($self[0].dataset.maxlength);
			}
		
			// only accept backspace, arrow keys and delete after maximum characters
			let keys = [8,37,38,39,40,46];
		
			if($(this).text().length === maxlength && keys.indexOf(e.keyCode) < 0) { 
			  e.preventDefault();
			}
		
			if(e.keyCode===13){
			  $(this).blur();
			}
		  });
		
		  html.find('[contenteditable]').blur(async (event) => {
			let value = event.target.textContent;
			let target = event.target.dataset.target;
			html.find('input[type="hidden"][data-input="'+target+'"]').val(value).submit();
		  });
	});

Hooks.on("renderTidy5eNPC", async (app, html, data) => {
	const tidyNpcCurrency = $(html).find('.inventory-currency');

	// If NPC remove Shadow and Perm scores
		let npcSha = $(html).find('[data-ability="sha"]');
		let npcPerm = $(html).find('[data-ability="perm"]');
		npcSha.remove();
		npcPerm.remove();
	
	// Currency
	tidyNpcCurrency.remove();
});

Hooks.on("renderTidy5eVehicle", async (app, html, data) => {
	const tidyGP = "/modules/aime/templates/aime-tidy5e-gp.hbs"
	const tidyGPRender =  await renderTemplate(tidyGP, data);
	const tidySP = "/modules/aime/templates/aime-tidy5e-sp.hbs"
	const tidySPRender =  await renderTemplate(tidySP, data);
	const tidyCP = "/modules/aime/templates/aime-tidy5e-cp.hbs"
	const tidyCPRender =  await renderTemplate(tidyCP, data);

	// Remove Shadow and Perm scores
	let npcSha = $(html).find('[data-ability="sha"]');
	let npcPerm = $(html).find('[data-ability="perm"]');
	npcSha.remove();
	npcPerm.remove();

	// Change currency abbreviations
	var tidyGPReplace = $(html).find('.denomination.gp')[0];
	tidyGPReplace.innerHTML = tidyGPRender;
	var tidySPReplace = $(html).find('.denomination.sp')[0];
	tidySPReplace.innerHTML = tidySPRender;
	var tidyCPReplace = $(html).find('.denomination.cp')[0];
	tidyCPReplace.innerHTML = tidyCPRender;

});
