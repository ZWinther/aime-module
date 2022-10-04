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

	// const rpgUI = game.modules?.get('rpg-styled-ui')?.active;
	const tidy5eModule = game.modules?.get('tidy5e-sheet')?.active;

	if (tidy5eModule === true) {
    		loadTemplates([
    		'modules/aime/templates/aime-tidy5e-standard.hbs',
    		 ]);
    	}
    // if (rpgUI === true) {
    // 	loadTemplates([
    // 		'modules/aime/templates/aime-miserable-box-rpgui.hbs',
    // 		]);
    // 	}
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

   // libWrapper.register("aime", "CONFIG.Actor.documentClass.prototype._preCreate", function patchedPreCreate(wrapped, ...args) {
   //      wrapped(...args);

 
   //  }, "WRAPPER");


});

function i18n(key) {
	return game.i18n.localize(key);
}

Hooks.on('renderActorSheet', async function (app, html, data) {
	const sheet5e = app.options.classes.join();
	const sheetTidy = app.options.classes[0];
	const sheetTidyType = app.options.classes[3];

	if (sheet5e === "dnd5e,sheet,actor,character") {
		const misBox = "/modules/aime/templates/aime-miserable-box.hbs"
		const misHtml = await renderTemplate(misBox, data);
		var inspDiv = $(html).find(".flexrow.inspiration");
		inspDiv[0].outerHTML = misHtml;

        const scoreBox = "/modules/aime/templates/aime-scores-end.hbs"
        const scoreHtml = await renderTemplate(scoreBox, data);
        var abiScores = $(html).find(".ability-scores.flexrow");
        var endScores = $(html).find( ".ability-scores.flexrow li" ).slice(6);
        endScores.remove()
		abiScores.append(scoreHtml)

        const livingBox = "/modules/aime/templates/aime-living-standard.hbs"
        const livingHtml = await renderTemplate(livingBox, data);
        var alignment = $(html).find('*[name="system.details.alignment"]').parent()[0];
        alignment.innerHTML = livingHtml;

        //Remove spellbook
        $(html).find('*[data-tab="spellbook"]').remove()

        $(html).find(".dnd5e.sheet.actor.character").css("min-height", "823px");

   //      //RPG-Styled UI Compatibility
   //      if (rpgUI === true) {
   //      	const ctrlDiv = '<div class="control-group"></div>';
   //      	const ctrlEndDiv = '</div>';
   //      	const ctrlLabel = '<label class="control control-checkbox"></label>';
   //      	const ctrlEndLabel = '</label>';
   //      	const ctrlIndicator = '<div class="control_indicator ctrlNew"></div>'
   //      	const resInput = $(html).find(".recharge.checkbox.flexcol input")
   //      	const misBox = "/modules/aime/templates/aime-miserable-box-rpgui.hbs"
			// const misHtml = await renderTemplate(misBox, data);
			// var inspDiv = $(html).find(".flexrow.inspiration");
			// $(".dnd5e.sheet.actor.character").css("min-height", "823px");
			// $(html).find(".encumbrance.encumbered").css("background", "#ffffff14");
			// $(html).find(".encumbrance-bar").css({"background": "#331914","border": "1px solid #372d25"})
			// $(html).find(".encumbrance-label").css("font-size", "10px")
			// $(html).find(".ability3").css("border", "2px groove var(--border-color)");
			// resInput.wrap( ctrlDiv ).wrap( ctrlLabel ).after( ctrlIndicator );
			// inspDiv[0].outerHTML = misHtml;
   //      };
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

        // Tidy5e Sheet Compatibility
        if (sheetTidy === "tidy5e") {
			const livingBox = "/modules/aime/templates/aime-tidy5e-standard.hbs"
			const livingHtml = await renderTemplate(livingBox, data);
			const tidyMisBox = "/modules/aime/templates/aime-tidy5e-miserable.hbs"
			const tidyMisHtml = await renderTemplate(tidyMisBox, data);
			const tidyGP = "/modules/aime/templates/aime-tidy5e-gp.hbs"
			const tidyGPRender =  await renderTemplate(tidyGP, data);
			const tidySP = "/modules/aime/templates/aime-tidy5e-sp.hbs"
			const tidySPRender =  await renderTemplate(tidySP, data);
			const tidyCP = "/modules/aime/templates/aime-tidy5e-cp.hbs"
			const tidyCPRender =  await renderTemplate(tidyCP, data);
			var tidyAlignment = $(html).find('[data-target*="alignment"]');
			var tidyAlignmentInput = $(html).find('input[name="system.details.alignment"]')[0];
			var tidyBackground = $(html).find('[data-target*="background"]');
			var tidyInspiration = $(html).find('.inspiration');

			// Remove alignment and insert standard of living
			if (sheetTidyType != "vehicle") {
			tidyAlignment.remove();
			tidyAlignmentInput.remove();
			}
			// If NPC or Vehicle remove Shadow and Perm scores
			if (sheetTidyType != "character") {
			var npcSha = $(html).find('[data-ability="sha"]');
    		var npcPerm = $(html).find('[data-ability="perm"]');
        	npcSha.remove();
        	npcPerm.remove();
			}
			if (sheetTidyType === "character") {
			tidyBackground.after(livingHtml);

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

			// Remove spellbook tab
			$(html).find('[data-tab="spellbook"]').remove()	

			// Change currency abbreviations
			var tidyGPReplace = $(html).find('.denomination.gp')[0];
			tidyGPReplace.innerHTML = tidyGPRender;
			var tidySPReplace = $(html).find('.denomination.sp')[0];
			tidySPReplace.innerHTML = tidySPRender;
			var tidyCPReplace = $(html).find('.denomination.cp')[0];
			tidyCPReplace.innerHTML = tidyCPRender;
			}
        }
    });
