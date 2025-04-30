// ---------------------------------------------------------------------------------------
//   ~STORY LOGIC~
    const story = {
         activeText: null, // This will be set to the current text array
// FAST --> These choices were integrated with the gameText object, please review those changes.        
         //startChoices: ["Accept the owl's request", "Decline the owl's request", "Think about it"], 
         combat: [],
         actions: [act, combat, inventory],
// FAST --> These actions need to be folded into the gameText object where apporpriate for your story         
         caveActions: ["explore", "continue"],
         finalActions:["follow", "plunge down", "get back"],
// FAST --> End of actions in need of change         
            playerDeath: function(){
                if (Player.health == 0){
                    console.log("You have fallen..."); 
                }
            },

            i: 0,
            textIndex: 0,
            speed: 30,
            isTyping: false,
            typingTimeout: null, // stores the setTimeout reference
            

            // List of special text node names where the CONTINUE button should hide
            nodesThatHideContinue: ["callToAction"],
            // List of special text node names where the CONTINUE button should hide



            // OBJECT FOR GAME TEXT
            gameText: {
                "introText": [
                    {
                      "name": "introText1",
                      "text": "Your name is Red. You are a redwing bird who lives in a forest full of other redwing families. Your father and brother go on a quest with a flock of scout birds to find a safe place to migrate."
                    },
                    {
                      "name": "introText2",
                      "text": "The squadron does not return for two months. Your mother is worried about your father and brother. Rumors spread throughout the forest about the missing redwings."
                    },
                    {
                      "name": "introText3",
                      "text": "One day, an owl arrives. He flies down to your nest and greets you and your mother. The owl then tells you that he knows where your father and brother are and calls you to go with him and find them."
                    },
                    {
                      "name": "callToAction",
                      "text": "What is your next move? (Choose an option from ACT)",
//  FAST ---> This is where the choices will be defined. Syntax: [["Choice text", "gameText Key"]]. Repeat for each callToAction in your story.
                      choices: [["Accept the owl's request", "routeOfAcceptance"],["Decline the owl's request", "rejectingTheCall"],["Think about it", "pathOfContemplation"]]
                    }
                  ],
                //   If the player chooses "Accept the owl's request" in startChoices, then this text will apply
                  "routeOfAcceptance": [
                    {
                    "name": "acceptStart",
                    "text": "If you accept the owl’s request and decide to go on this adventure, then your journey begins."
                    },
                    {
                    "name": "locationReveal",
                    "text": "You ask the owl where the missing redwings are hidden. He tells you that they are in a forest that lies beyond a mountain range."
                    },
                    {
                    "name": "falconFightIntro",
                    "text": "As soon as the owl says that, a falcon swoops in and a fight breaks out."
                    },
                    {
                    "name": "falconWinOutcome",
                    "text": "If the falcon manages to bring you down to 0 hp, then the game ends with one of its possible endings: 'You Have Fallen.'"
                    },
                    {
                    "name": "falconLossOutcome",
                    "text": "However, if you manage to defeat the Falcon, you receive a bundle of seeds as an item, which heals you completely when used."
                    },
                    {
                    "name": "soarenIntro",
                    "text": "Your journey continues and you ask the owl for his name. He tells you that his name is Soaren, Guardian of the forest. He reveals that his brothers and sisters are also guardians; they keep watch at night."
                    },
                    {
                    "name": "tarantulaFightIntro",
                    "text": "Soaren then suggests that you stop to get some rest. When you settle under the shade of a tall tree, you spot a tarantula, who crawls up to you, preparing to attack."
                    },
                    {
                    "name": "tarantulaFightOutcomeFail",
                    "text": "If the tarantula manages to bring you down to 0 hp, then the game finishes with the 'You Have Fallen' ending."
                    },
                    {
                    "name": "tarantulaFightOutcomeWin",
                    "text": "However if you defeat the tarantula, you receive another bundle of seeds and you also obtain a new item called 'poisonous tusk.' This item gives you an additional combat move called 'Poison,' which deals 1 damage every turn."
                    },
                    {
                    "name": "mountainApproach",
                    "text": "After getting some rest, you fly off once more. The sun is beginning to set, and Soaren tells you that you are approaching the mountain range, which is sitting right above the forest where your father and brother are."
                    },
                    {
                    "name": "soarenRevealsTruth",
                    "text": "You finally ask Soaren about what really happened to them. He urges you not to panic but to stay calm, and he admits to you that they have been captured by falcons."
                    },
                    {
                    "name": "soarenEncourages",
                    "text": "Soaren reveals that the reason why he didn’t explain this earlier was because he didn’t want you to get scared, but the owl encourages you and tells you to cheer up: there is still hope."
                    },
                    {
                    "name": "strongFalconBattleIntro",
                    "text": "Suddenly you see a strong falcon approaching. Unlike in other battles, Soaren deals the first blow to the enemy."
                    },
                    {
                    "name": "strongFalconBattleOutcome",
                    "text": "Once you successfully defeat the strong falcon, you fly the last few meters to the mountain range. It is now dark."
                    }
                ],
                //   If the player chooses "Decline the owl's request" in startChoices, then this text will apply:
                "rejectingTheCall": [
                    {
                    "name": "rejectStart",
                    "text": "If you decline the owl’s request to go with him, he flies away, but not before giving you directions on where you can find him if you change your mind. In two days, you decide to follow the owl."
                    }
                ],

                //   If the player chooses "Think about it" in startChoices, then this text will apply:
                "pathOfContemplation": [
                    {
                    "name": "contemplationIntro",
                    "text": "If you instead choose to 'think about it,' you exit the scene, leaving the owl and your mother behind, to take a 'stroll' and get some fresh air while you contemplate the owl’s request."
                    },
                    {
                    "name": "falconAmbushDuringContemplation",
                    "text": "You are currently flying, when suddenly, a falcon swoops down to attack you."
                    }
                ],
                // The next scenes are the same for both "Think about it" and "Decline the owl's request"
                "mergingPaths": [
                    {
                        "name": "falconAmbushDuringContemplation",
                        "text": "You are currently flying, when suddenly, a falcon swoops down to attack you."
                    },
                    {
                    "name": "rejectCombatIntro",
                    "text": "Upon choosing the 'combat' action, you use your 'peck' move. However, the game tells you that you are too weak to hurt the falcon. 'Peck' does nothing, and you are returned to the action options."
                    },
                    {
                    "name": "rejectActFail",
                    "text": "When you choose the 'act' action, you try to outrun the bird, but in vain. You are too weak to outrun it."
                    },
                    {
                    "name": "rejectEatFail",
                    "text": "If you choose the 'eat' action, you try to bite the falcon, but it is pointless. You are not strong enough. Either action ends the game: 'You Have Fallen.'"
                    },
                    {
                    "name": "rejectTalk1",
                    "text": "You try to convince the falcon to stop attacking. The falcon snaps: 'Quiet, little redwing. You shall be my supper!'"
                    },
                    {
                    "name": "rejectTalk2",
                    "text": "You try talking again. The falcon replies: 'Why should I stop? You look too tasty!' He prepares to slash—"
                    },
                    {
                    "name": "owlRescue",
                    "text": "The owl from earlier swoops in, catches you, and escapes while carrying you in his talons."
                    },
                    {
                    "name": "owlCheckIn",
                    "text": "The owl asks: 'Are you hurt, little one?'"
                    },
                    {
                    "name": "talkResponse",
                    "text": "You tell the owl you're okay and thank him. He replies: 'You are welcome. Relax while I take you to my hideout.'"
                    },
                    {
                    "name": "eatResponse",
                    "text": "You tell the owl you're hungry. He says: 'You poor child! Let me take you to my nest and feed you.' You faint from fatigue."
                    },
                    {
                    "name": "actResponse",
                    "text": "You look down and realize you're high above the ground. You faint."
                    },
                    {
                    "name": "wakeUpScene",
                    "text": "You wake up in a dark, abandoned watchtower. There's a fireplace and a bundle of seeds before you. The owl stares into the night."
                    },
                    {
                    "name": "watchtowerAct",
                    "text": "You explore the room and find a chest with a book titled 'The Redwing’s Song.' You gain 5 XP and learn a tune usable once per battle."
                    },
                    {
                    "name": "watchtowerEat",
                    "text": "You eat the seeds and regain health. You gain +3 strength."
                    },
                    {
                    "name": "watchtowerTalk1",
                    "text": "You ask: 'Where are we, Mr. Owl?' He replies: 'Ah! You’re awake. We are in my nest. We’ll begin our journey in the morning.'"
                    },
                    {
                    "name": "watchtowerAct2",
                    "text": "You move closer and ask what he means by 'start our journey.'"
                    },
                    {
                    "name": "watchtowerTalk2",
                    "text": "You either compliment his home or ask what he meant. He replies: 'Call me Soaren, guardian of the Forest. I promised your mother you'd be safe.'"
                    },
                    {
                    "name": "watchtowerTalk3",
                    "text": "If you compliment his home, he responds: 'Why, I appreciate that! But we must not stay too long. The journey is perilous.'"
                    },
                    {
                    "name": "questBegins",
                    "text": "Soaren says: 'We must leave tonight.' Suddenly, a tarantula jumps at you from a dark corner."
                    },
                    {
                    "name": "tarantulaBattleRejectOutcome",
                    "text": "You can lose ('You Have Fallen') or win and gain 10 XP."
                    },
                    {
                    "name": "soarenAfterBattle",
                    "text": "'That was a close one!' Soaren says. 'But you’re safe. Let’s not waste time—we must begin our quest.'"
                    },
                    {
                    "name": "peacefulFlight",
                    "text": "You fly for 30 minutes in the chilly night. 'Those are my siblings,' says Soaren. 'They keep watch—'"
                    },
                    {
                    "name": "falconAttackMidflight",
                    "text": "A falcon suddenly attacks. 'WATCH OUT!!!' yells Soaren. The falcon strikes first. Win and gain 10 XP, or fall."
                    }
                ],  
                // Text for The Cave Scene:
                    "theCaveScene": [
                    {
                    "name": "caveArrival",
                    "text": "You finally reach the mountain overlooking your destination. You fly into a cave that goes through the mountain."
                    },
                    {
                    "name": "newActions",
                    "text": "You are now presented with two new actions, separate from the regular ones: 'Explore the cave' and 'Continue.'",
                    caveActions: [["Explore", "Upon selecting the 'Explore the cave' option, you look around. You find a chest with a bundle of seeds (an item which is now stored in your inventory) and a book (also added to inventory). The book allows you to use 'flight,' which can only be used once the player reaches a certain xp threshold."],["Continue", "Upon selecting the 'Continue' option, you move through the cave and skip to the next scene."]]
                    }
                ],
                // Text for Giant Tarantula Bossfight:
                "giantTarantulaBossfight": [
                {
                "name": "bossfightIntro",
                "text": "You continue traversing the cave, and you fly into a giant, dark room. It’s quiet at first, but suddenly you hear a loud, coarse screeching noise. You realize that there is a giant tarantula in the room, six times bigger than you and Soaren. (Same story here. You can either end the game with 'You Have Fallen' or win the fight)."
                },
                {
                "name": "bossfightVictory",
                "text": "When you deal the final blow to the giant vermin, it lets out a final, deafening screech. The tarantula faints, and falls to the ground. You have defeated it."
                },
                {
                "name": "bossfightReward",
                "text": "You then obtain a new item (Venom, can only be used once per battle, deals 10 damage) and exit the cave from the other side. You have flown through the mountain, and now you have reached the final destination."
                }
                ],
                // Text for The Climax
                "theClimax": [
                {
                "name": "burningForest",
                "text": "You approach a forest, but you breathe in a whiff of smoke through your nostrils. You then realize that the forest is burning. Soaren urges you to hurry forward, and the two of you dive down to the forest and find a dry place to land with no fire. \nYou find your father, brother, and the rest of the redwing squadron, but they are wounded by strong falcons, and some are even held captive in wooden cages. You see some of the falcons in the sky, gliding, watching over the scene, and some are bunched around the redwings, who are getting hurt. Some falcons are guarding the jailers. \nYou come closer to your father and brother. Luckily, dad is not hurt, but your brother, who’s name is Featherfoot, is limping. His foot is wounded. \n“Son! You’re here! You should have stayed home, where it was safe.”\n“It’s good to see you, Red,” says your brother (his name is Featherfoot), “but dad’s right. You should have stayed home and helped mom.”"
                },
                {
                "name": "climaxTalkOptions",
                "text": "If you choose to respond with the “talk” action, you are presented with three options. You can either greet your father and brother, tell them that they need to get out of here, or ask what happened to your brother.\nFirst option: “I’m glad to see you too, Featherfoot! And dad, I missed you so much! You look so exhausted!”\nDad: “We are indeed, son. We’ve been breathing fumes for a day and a half now!” \nHe coughs.\nFeatherfoot: “Oh dad, we need to get out of here! There’s too much smoke! I can’t see the sky in this thick fog!”\n“But the sky is watching us, and it sees us clearly! Look!” exclaims Soaren “I see falcons!”"
                },
                {
                "name": "climaxSecondThirdOptions",
                "text": "Second option: “You guys need to hurry and get out of here! The falcons are ruthless!”\nDad: “We’ve been trying to escape since day one, son. It’s not that easy. The falcons have held us captive for months now, and they lit a fire around the forest to end us!”\nSuddenly, Featherfoot looks to the sky.\n“Oh no!” he gasps, “I see falcons! They’re heading down to us!!”\nThird option: “Featherfoot, what happened to you? You’re limping!”\nFeatherfoot: “I’ve been wounded by a big falcon, Red. He came up to dad and started poking him up and mocking him, and I decided to stand up and protect him. Before I could do anything, the falcon picked me up and flew to the sky, and then he dropped me to the ground while I was ten feet above it. I was really hurt at first, but I think I’m healing now.”\nSuddenly, Featherfoot looks to the sky.\n“Oh no!” he gasps, “I see falcons! They’re heading down to us!!”"
                },
                {
                "name": "climaxActAndHeal",
                "text": "If you instead choose to “act,” you tell your brother that you will go find something to patch up his wound. You fly off, but Soaren calls you back.\n“Hold on there, little one!” he exclaims, “I’ve got a better idea.”\nHe then uses “Ointment of The Forest,” which heals your brother completely.\nYour father and brother both gasp in surprise \n“He’s healed!” exclaims the dad, “My son is healed! Oh, thank you kind sir!”\n“Don’t thank me yet, Mr. Redwing,” answers Soaren, “we must get you and your brethren out of this burning heap, and fast! But look, Little Redwing, I think we have company!”"
                },
                {
                "name": "climaxCombatHeal",
                "text": "If you choose “combat,” you can only use “Song.” When you use the move, it heals your brother completely.  \nYour father and brother both gasp in surprise.\n“Son, you’re better!”\n“No way! Red, you healed me!” says your brother “How did you do that? That was so cool bro.”\n“That was a very kind deed, little one,” says Soaren, when suddenly he exclaims “Look! I see three falcons coming our way!”"
                },
                {
                "name": "climaxFalconTrio",
                "text": "Three big falcons swoop down from the sky and land right next to you. \n“What’s dis?” says one (his name is Screecher) “Some little bird thinks he can just barge in uninvited! \n“You scoundrels!” answered Soaren, “The only ones who barged are you and your team of hooligans! Let the redwings go right this second!”\n“And who’s this old grandpa?” says the second, ignoring Soaren (his name is  Far-Cry)\n“I think it's Gandalf the Grey” says the third (his name is Thundercloud)\n“Is it Gandalf the Grey or Gandalf the White? I can’t tell!” (Far-Cry)\nThe three of them all burst out laughing.\nThe falcons are massive in size, towering over you, but you feel courage in your heart. You don’t seem to be afraid of them or frightened by them in the slightest.\nYou decide to take action."
                },
                {
                "name": "climaxFightSequence",
                "text": "If you choose to respond with the “talk” action, you stand up to the falcons.\n“Back off, bully! This is my family you’re messing with!” \n“Ah!” exclaims Far-Cry “This little fella thinks he can snap back! No problemo. I’ll just slash him!” (This is a fighting scene with the same possible death ending. In between falcons, your “Song” move resets, and you can heal on the next falcon. If you defeat Far-Cry, you move on to fight Screecher).\nFar-Cry: “Oooh! Help me...” \nHe faints. \nScreecher: “You’ll pay for this!”  (You can get the death ending here; If you defeat Screecher, you move on to fight Thundercloud).\nScreecher: “Ah! That little kid’s got some… skill…”\nHe faints.\nThundercloud: “Well, you ain’t Frodo Baggins, you’re much smaller than him! Imma send thunder over you and you’ll become a mere vapor. Think you got what it takes? Bring it on!”  \n(You can get the death ending here; If you defeat Thundercloud, you win the battle).\nThundercloud: “AAAH!!! You defeated me!”\nThundercloud falls to the ground, trembling.\n“Redwings are much more cunning than I thought. Much stronger too…” \nYou notice that he suddenly feels intimidated by you. It also occurs to you that all the other falcons were watching your fight, and they are also very scared. \nSuddenly Thundercloud begins to scream.\n“EVERYBODY! GET OUT OF HERE! THERE’S A STRONG BIRD HERE!”\nThe fog begins to clear. The cowardly falcons begin escaping and gather into a big, panicking flock, and they move westward. They are all screeching very loudly, fearing that you or Soaren might chase after them. \nThe flock slowly fades into the distance. You and the rest of the group stare at the falcons, shocked at what had just happened."
                },
                {
                "name": "climaxVictoryEscape",
                "text": "And then… the crowd goes wild. The captive redwings are now free! You saved them all! You are a HERO!\nEveryone flies to you and Soaren, lifting you up from the ground and tossing you into the air. The crowd chants: “Hoorah for Little Red! Hoorah for Little Red!”\n“I’m very proud of you, son,” says your father, “you saved your brethren, and we are grateful for your bravery and determination.”\n“Yeah, Red,” says Featherfoot, “That was sick! I didn’t know you were so good at fighting!”\n“I knew you could do it, little redwing,” says Soaren, “after everything we’ve been through together, this was one of the greatest battles we’ve ever fought. Well done!”\nAs the crowd thanks you, you are reminded of the fact that the tall trees surrounding you are still burning. They are like tall towers, imposing themselves over you and your friends.\nAnd then, realization hits you… the trees are collapsing. \n“THE TREES!” shouts Featherfoot “THEY ARE FALLING ON US!”\nThe flock starts to panic, but in the same instant, everyone goes airborne.\n“Hurry, son!” your father shouts. \nYou follow suit.\nEvery tree in the forest is now crashing, one by one. However, your flock is led by Soaren, who is a master at maneuvering. He directs everyone to follow his movements:\n“This way!” he shouts, as you approach the exit.\nYou are following close behind everybody, and your brother and father are right in front of you. Suddenly, a colossal conifer begins to topple over everyone.\n“HURRY!” shouts the owl, “WE CAN STILL MAKE IT!”\nEverybody gets away, to the other side, but you are behind everybody, trying the best you can to get close to the group, but you are too slow. \nYOU NOW SEE THE TREE FALLING ON YOU. You can still make it across, but you also see a hole in the ground beneath you. \nYOU HAVE SIX SECONDS TO MAKE YOUR NEXT MOVE.\nYou are now presented with three options: you can either get back and fly in the opposite direction, away from the flock; you can plunge down into the hole beneath you, or you can follow the rest and cross to the other side.",
                finalActions:[["Follow", "If you choose the get back option, you evade the falling tree just in time. It crashes with a loud thump, and a branch from the tree breaks off and hurts you. You faint.\nSuddenly you hear a voice.\n“Wake up.”"], ["Plunge down",] ["Get back"]]
                }
                ],
                // Text for THE FINALE:
                // Upon choosing the "getBack" option from finalActions, the user will see this text:
                "getBack": [
                    {
                        "name": "wakeInFire",
                        "text": "You open your eyes, and your vision is blurred. You can make out, however, that you are surrounded by flames. You are coughing.\n“The smoke is really hitting you, huh?” says the voice.\nYour vision clears and you try to get a closer look at the speaker.\nIt is a falcon.\nWhat should you do?"
                    },
                    {
                        "name": "combatBlocked",
                        "text": "If you choose combat, the dialogue box tells you that you cannot fight because your strength is at zero. The game takes you back to “actions.”"
                    },
                    {
                        "name": "eatBlocked",
                        "text": "If you choose to eat, the dialogue box tells you that you are too weak to make any movements (this will still be the case if you choose the “seeds” item from your inventory)"
                    },
                    {
                        "name": "actFails",
                        "text": "If you choose to act, you try to get up, but you tremble and fall back to the ground.\n“Don’t try that,” says the falcon, “you are too weak. But you will soon be strengthened. Come with me.”"
                    },
                    {
                        "name": "talkPrompt",
                        "text": "If you choose to talk, you are presented with two options."
                    },
                    {
                        "name": "talkOption1",
                        "text": "“Why aren’t you trying to kill me?”" 
                    },
                    {
                        "name": "outcome1",
                        "text": "“I do not want you to die,” the falcon says, “because you are my prisoner. Come with me.”"
                    },
                    {
                        "name": "talkOption2",
                        "text": "“Get Away!”" 
                    },
                    {
                        "name": "outcome2",
                        "text": "“Why should I?” says the falcon, “I am only here to help you. Come with me.”"
                    },
                    {
                        "name": "faintAgain",
                        "text": "You shut your eyes again, and your strength is failing. You faint once again, but you feel yourself being lifted from the ground.\nAnd then you feel the air. It is fresh air. But you feel a certain chill in your feathers. A chill… of winter…"
                    }
                    ],
                // Upon choosing the "plungeDown" option from finalActions, the user will see this text:
                    "plungeDown": [
                    {
                        "name": "plungeIntoHole",
                        "text": "If you choose the plunge down option, you plunge down into the hole beneath you. The tree falls with a loud thump, covering the hole. You are safe inside, but there is no light. You call out for help, but no one hears you. After crying out for about an hour, you decide to explore the hole. It turns out to be a cave system."
                    },
                    {
                        "name": "meetGlydeAndClancy",
                        "text": "After exploring for a while, you find an old owl and a crow.\n“Greetings, little one,” says the owl, “I am Glyde, brother of Soaren. And this crow sitting in front of me is Clancy, my companion. We have been waiting for someone important to arrive.”"
                    },
                    {
                        "name": "stayInCave",
                        "text": "“Yes,” says the crow, “we’ve been sitting here, in this cave, for two months now, with no sunlight, and we are quite lonesome. You look like a friendly fellow. Would you care to stay with us until our awaited traveler returns?”\nYou decide to keep them company and stay with them until the traveler comes back."
                    }
                    ],
                
                // Upon choosing the "follow" option from finalActions, the user will see this text:

            },

            writeText: function () {
                const currentArray = this.activeText || this.gameText.introText;
        
                if (this.textIndex >= currentArray.length) {
                    if (
                        this.activeText === this.gameText.rejectingTheCall ||
                        this.activeText === this.gameText.pathOfContemplation
                    ) {
// FAST --> Checking for logic error, you may remove this console.log                        
                        console.log("You have reached the end of the 'Decline' or 'Think' path.");
                        specialFunctionForEndOfDeclineOrThink();
                    }
                    else if (
                        this.activeText === this.gameText.routeOfAcceptance
                    ) {
                        routeOfAcceptanceLogic();
                    }
                    return;
                }
                
                const currentEntry = currentArray[this.textIndex];

                // ⬇ HIDE continue button if current text entry is in the "hide list"
                const nextButton = document.getElementById("nextButton");
                let actButton = document.getElementById("act");
                if (story.nodesThatHideContinue.includes(currentEntry.name)) {
                    nextButton.style.display = "none";
                    if (currentEntry.name === "callToAction") {
                        actButton.classList.remove("disabled");
                    }
                    // add additional if condition for combat here
                
                } else {
                    nextButton.style.display = "flex"; 
                }

                const fullText = currentEntry.text;

                if (this.i < fullText.length) {
                    this.isTyping = true;
                    document.getElementById('text').innerHTML += fullText.charAt(this.i);
                    this.i++;
                    this.typingTimeout = setTimeout(() => this.writeText(), this.speed);
                } else {
                    this.isTyping = false;
                }
            },
        
            skipOrNext: function () {
                const currentArray = this.activeText || this.gameText.introText;
        
                // Case 1: Skipping the typewriter animation
                if (this.isTyping) {
                    clearTimeout(this.typingTimeout);
                    const fullText = currentArray[this.textIndex].text;
                    document.getElementById('text').innerHTML = fullText;
                    this.i = fullText.length;
                    this.isTyping = false;
                } 
                // Case 2: Going to the next sentence
                else {
                    this.textIndex++;
                    this.i = 0;
        
                    if (this.textIndex < currentArray.length) {
                        document.getElementById('text').innerHTML = '';
                        this.writeText();
                    } 
                }
            }
        };
        
        function routeOfAcceptanceLogic() {
            console.log("Extra logic after decline or think path finishes.");
        }

        function specialFunctionForEndOfDeclineOrThink() {
            console.log("Extra logic after decline or think path finishes.");
        }

        
        
        // document.addEventListener('DOMContentLoaded', function () {
        //     document.getElementById('nextButton').addEventListener('click', function () {
        //         story.skipOrNext();
        //     });
        
        //     // Start with initial text (can be set dynamically)
        //     story.writeText();
        // });
    
// ---------------------------------------------------------------------------------------
//   ~PLAYER LOGIC~
  
    class Player{
        constructor(){
            this.maxHealth = 10; 
            this.health = 10; 
            this.strength = 0; 
            this.exp = 0; 
            this.inventory = [];
            this.canUseVenom = false;
            this.canUseFlight = false;
        }
       }

       const player = new Player();


       document.addEventListener('DOMContentLoaded', function () {
        // === OTHER BUTTONS ===
        document.getElementById('nextButton').addEventListener('click', function () {
            story.skipOrNext();
        });

        story.writeText();

        // === INVENTORY LOGIC ===
        const inventoryButton = document.getElementById("inventory");
        const closeInventoryButton = document.getElementById("closeInventory");
        const inventoryDisplay = document.getElementById("inventoryDisplay");

        inventoryButton.addEventListener("click", function () {
            // Update stat values
            document.getElementById("playerExp").textContent = `EXP: ${player.exp}`;
            document.getElementById("playerStrength").textContent = `Strength: ${player.strength}`;
        
            // Calculate health ratio
            const healthRatio = player.health / player.maxHealth;
            const healthElement = document.getElementById("playerHealth");
            healthElement.textContent = `Health: ${player.health}`;
        
            // Set color based on ratio
            if (healthRatio >= 0.8) {
                healthElement.style.color = "chartreuse";
            } else if (healthRatio >= 0.35) {
                healthElement.style.color = "yellow";
            } else {
                healthElement.style.color = "red";
            }
        
            // Update inventory items
            const itemsList = document.getElementById("playerItems");
            itemsList.innerHTML = "";

            if (player.inventory.length > 0) {
                player.inventory.forEach(item => {
                    const li = document.createElement("li");
                    const button = document.createElement("button");
                    button.textContent = item;
                    button.classList.add("inventory-item");
                    // You can add functionality here later
                    li.appendChild(button);
                    itemsList.appendChild(li);
                });
            } else {
                const li = document.createElement("li");
                const button = document.createElement("button");
                button.textContent = "(Empty)";
                button.classList.add("inventory-item");
                li.appendChild(button);
                itemsList.appendChild(li);
            }
        
            // Show the inventory
            inventoryDisplay.style.display = "block";
        });

        closeInventoryButton.addEventListener("click", function () {
            inventoryDisplay.style.display = "none";
        });

        // === ACT BUTTON SETUP ===
        const actButton = document.getElementById("act");
        const actDisplay = document.getElementById("actDisplay");
        const actOptions = document.getElementById("actOptions");
        const closeActDisplay = document.getElementById("closeActDisplay");

        actButton.addEventListener("click", function () {
            actOptions.innerHTML = ""; // Clear previous options
            const currentArray = story.activeText || story.gameText.introText;
            const currentEntry = currentArray[story.textIndex];
            console.log(currentEntry.choices); // Check the current entry's choices

            let optionsToShow = [];
// FAST --> Your previous code for reference.
            // Use currentEntry.name to decide which choices to show
            // if (currentEntry && currentEntry.name === "callToAction") {
            //     optionsToShow = story.startChoices;
            // }

// FAST --> I modified this to use the new variable currentEntry.choices instead of the hard-coded story.startChoices
            if (currentEntry && currentEntry.name === "callToAction") {
                optionsToShow = currentEntry.choices;
            }

            // Reusable logic to add buttons
            if (optionsToShow.length > 0) {
                optionsToShow.forEach(choice => {
                    const button = document.createElement("button");
                    // button.textContent = choice;
// FAST --> I modified this to use the new variable choice[0] to show the text and not both the text and destination key from the new choices array on your story objects.                    
                    button.textContent = choice[0]; 
                    button.classList.add("act-option");
                    button.addEventListener("click", () => {
                        // console.log(`Player chose: ${choice}`);
// FAST --> I modified this to use choice as an array variable to show the text and destination key from the new choices array on your story objects.                        
                        console.log(`Player chose: ${choice[0]}; goto --> ${choice[1]}`);
                        // Hide the act display
                        actDisplay.style.display = "none";
                        
// FAST --> I modified this section to use the new variable choice[1] to go to the destination key from the choices array on your story objects.
                        if (story.gameText[choice[1]]) { //check if the destination key exists
                            story.activeText = story.gameText[choice[1]]; // Set the active text to the new destination key
                            story.textIndex = 0; // Reset text index
                            story.i = 0; // Reset character index
                            document.getElementById('text').innerHTML = ''; // Clear previous text
                            story.writeText(); // Update the active text
                            actButton.classList.add("disabled"); // Disable the act button
                        } else {
                            // Error handling fpr when the destination key doesn't exist
                            console.error(`No text found for ${choice[1]}`);
                        }
                    });
                    actOptions.appendChild(button);
                });
                } else {
                    const empty = document.createElement("button");
                    empty.textContent = "(No actions available)";
                    empty.classList.add("act-option");
                    actOptions.appendChild(empty);
                }

                if(actButton.classList.contains("disabled")) { 
                    // do not show actDisplay if actButton is disabled
                } else {
                    actDisplay.style.display = "block"; // Show the act display
                }
            });

        closeActDisplay.addEventListener("click", function () {
            actDisplay.style.display = "none";
        });
        // === COMBAT BUTTON SETUP ===
        const combatButton = document.getElementById("combat");
    });

// ---------------------------------------------------------------------------------------
//   ~Soaren~
       class Soaren{
        constructor(){
            this.combat = ["Screeching Nightwing", "Piercing Claw", "Ointment Of The Forest"];
        }
      }

// ---------------------------------------------------------------------------------------
// ~~~ENEMIES ENEMIES ENEMIES ENEMIES ENEMIES~~~

//   Enemy Combat Variable    
const enemyCombat = {
    falconMoves: [
        { name: "slash", type: "damage", amount: 2 },
        { name: "dodge", type: "evasion", turns: 2 }
    ], 
    tarantulaMoves: [   
        { name: "bite", type: "damage", amount: 2 },
        { name: "poison2", type: "damage", amount: 10, poison: true }
    ],
    giantTarantulaMoves: [
        { name: "megaBite", type: "damage", amount: 40 },
        { name: "venom", type: "damage", amount: 25, poison: true },
        { name: "antiVenom", type: "healing", amount: 30 }
    ],
    strongFalconMoves: [
        { name: "strongSlash", type: "damage", amount: 30 },
        { name: "healingOintment", type: "healing", amount: 25 },
        { name: "thunderbolt", type: "damage", amount: 50, special: true }
    ]
};

//   General Enemy Class     
      class Enemy{
        constructor(enemyName, health, moveKey){
            this.enemyName = enemyName;
            this.health = health;
            this.enemyMoves = enemyCombat[moveKey] || [];
            this.dodgeTurnsRemaining = 0;
        }
        applyMoveEffect(move) {
            if (move.type === "damage") {
                // Apply damage to player (you can implement player-specific logic here)
            } 
            else if (move.type === "healing") {
                this.health += move.amount;
            } 
            else if (move.type === "evasion") {
                this.dodgeTurnsRemaining = move.turns;
            }
            if (move.poison) {
                // You can handle poison effects here (e.g., reduce player health over turns)
            }
        }
    
            EnemyDeath(){
                if (this.health <= 0){ 
                     // Handle enemy death (e.g., trigger animations, drop loot, etc.)
                }
        }
        attack() {
            const randomMove = this.enemyMoves[Math.floor(Math.random() * this.enemyMoves.length)];
    
            // Check if the move is a special one like "thunderbolt"
            if (randomMove.name === "thunderbolt" && this.enemyName !== "Strong Falcon") {
                return; // Prevent "thunderbolt" unless it's the specific enemy
            }
    
            // If dodge is active, avoid attack
            if (this.dodgeTurnsRemaining > 0) {
                this.dodgeTurnsRemaining--;
                return; // Skip attack
            }
    
            console.log(`${this.enemyName} uses ${randomMove.name}!`);
            this.applyMoveEffect(randomMove);
        }
    }

// ---------------------------------------------------------------------------------------
//   ~FALCON~  
      // FAST --> I commented out the falcon instance creation to avoid errors since it was not used in the provided code.  
      //const falcon = new Enemy("Falcon", 10, falconMoves);

    //  clickable easter egg
      document.getElementById("darryl-img").addEventListener("click",()=>{})