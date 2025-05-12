// IMAGE PRELOAD 
 function preloadImages(imageUrls) {
    const preloadedImages = [];
    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
        preloadedImages.push(img);
    });
    console.log("Images preloaded:", imageUrls);
}  

function updateImageBox(imageUrl) {
    const imageBox = document.getElementById("imageBox");
    imageBox.innerHTML = ""; // Clear any existing images
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Scene Image";
    imageBox.appendChild(img);
}

  //   ~STORY LOGIC~
    const story = {
         activeText: null, // This will be set to the current text array
         currentSceneIndex: 0, //Track the current scene index
// FAST --> These choices were integrated with the gameText object, please review those changes.        
         //startChoices: ["Accept the owl's request", "Decline the owl's request", "Think about it"], 
         actions: [act],
// FAST --> These actions need to be folded into the gameText object where apporpriate for your story         
        //  caveActions: ["explore", "continue"],
        //  choices:["follow", "plunge down", "get back"],
// FAST --> End of actions in need of change  

            // playerDeath: function(){
            //     if (Player.health == 0){
            //         console.log("You have fallen..."); 
            //     }
            // },

            i: 0,
            textIndex: 0,
            speed: 30,
            isTyping: false,
            typingTimeout: null, // stores the setTimeout reference
            

            // List of special text node names where the CONTINUE button should hide
            nodesThatHideContinue: [
                "callToAction",
                "firstFalconEncounter",
                "tarantulaEncounter",
                "ambushFalconCallToAction",
                "mountainApproach",
                "rejectStart",
                "contemplationIntro",
                "soarenMountain",
                "caveActions",
                "exploreCave",
                "watchtowerTalk",

                // CHOICES IN WATCHTOWER CONVERSATION
                "askForNamE",
                "clarifyTheJourney",
                
                // CHOICES IN CAVE
                "soarenTalkCave",
                "tarantulaYourOnYourOwn",
                "provideAnAnswer",
                "youEscape",

                // DEATH IN CAVE (ENDING 1)
                "death",

                // THE CLIMAX
                "defendYourself",

                // FINALE
                "finalVerdictUltimate"

            ],
            // List of special text node names where the CONTINUE button should hide



            // OBJECT FOR GAME TEXT
            gameText: {
                "introText": [
                    {
                      "name": "introText",
                      "text": "Your name is Red. You are a redwing bird who lives in a forest full of other redwing families. Your father and brother go on a quest with a flock of scout birds to find a safe place to migrate."
                    },
                    {
                      "name": "introText",
                      "text": "The squadron does not return for two months. Your mother is worried about your father and brother. Rumors spread throughout the forest about the missing redwings."
                    },
                    {
                      "name": "introText",
                      "text": "One day, an owl arrives. He flies down to your nest and greets you and your mother. The owl then tells you that he knows where your father and brother are and calls you to go with him and find them:"
                    },
                    {
                      "name": "soarenIntroduction",
                      "text": "'I know where your brethren reside. Come with me, and we shall find them together.'"
                    },
                    {
                      "name": "motherTalk",
                      "text": "'Yes, Red,' says your mother. 'Mr. Owl seems like a trustworthy fellow. You should go with him. But pray you keep my child safe, Mr. Owl!'"
                    },
                    {
                      "name": "soarenAnswer",
                      "text": "'Mrs. Redwing, I can assure you that your son will be safe with me. So, what do you say, little redwing,'  asks the owl, 'will you join me in this journey?'"
                    },
                    {
                      "name": "callToAction",
                      "text": "What is your next move? (Choose an option from ACT)",
//  FAST ---> This is where the choices will be defined. Syntax: [["Choice text", "gameText Key"]]. Repeat for each callToAction in your story.
                      choices: [["Accept the owl's request", "routeOfAcceptance"],["Decline the owl's request", "rejectingTheCall"],["Think about it", "pathOfContemplation"]]
                    }
                  ],
                //   If the player chooses "Accept the owl's request" in choices (see array above), then this text will apply
                  "routeOfAcceptance": [
                    {
                    "name": "acceptStart",
                    "text": "You accept the owl’s request and your journey begins."
                    },
                    {
                    "name": "locationReveal",
                    "text": "You leave your nest and say farewell to your mother. You fly for a few meters, and once you exit your forest, you ask the owl where the missing redwings are hidden."
                    },
                    {
                    "name": "soarenLine1",
                    "text": "'They are beyond a vast mountain range,' answers the owl. 'in a lush evergreen forest.'"
                    },
                    {
                    "name": "soarenLine2",
                    "text": "'Worry not, young redwing. I am sure that we will find your father and brother by midnight.'"
                    },
                    {
                    "name": "falconFightIntro",
                    "text": "As soon as the owl says that, a falcon swoops in and a fight breaks out."
                    },


                    // DISABLE CONTINUE BUTTON
                    {
                      "name": "firstFalconEncounter",
                      "text": "What is your next move? (Choose an option from ACT)",
                       choices: [["Hit the falcon", "falconOwRunAway"],["Scream to Soaren for help", "soarenHelp"],["Evade The falcon", "evadeFalcon"]]
                    },
                    // ENABLE CONTINUE BUTTON
                  ],

                  "falconOwRunAway": [
                    {
                        "name": "falconRunsAway",
                        "text": "You hit the falcon with your little leg. 'OW! OWEE!' the falcon screeches. 'I’m outta here!' The falcon flies away."
                    },
                    {
                        "name": "soarenIntro",
                        "text": "Your journey continues and you ask the owl for his name. He tells you that his name is Soaren, Guardian of the forest. He reveals that his brothers and sisters are also guardians; they keep watch at night."
                    },
                    {
                        "name": "tarantulaFightIntro",
                        "text": "Soaren then suggests that you stop to get some rest. When you settle under the shade of a tall tree, you spot a tarantula, who crawls up to you, preparing to attack."
                    },
                    // DISABLE CONTINUE BUTTON
                    {
                        "name": "tarantulaEncounter",
                        "text": "What is your next move? (Choose an option from ACT)",
                        choices: [["Hit the tarantula", "tarantulaOwRunAway"],["Impress Soaren", "impressSoaren"],["Blow a Gust of Wind", "tarantulaFliesAway"]]
                    }
                    // ENABLE CONTINUE BUTTON
                  ],

                  "soarenHelp": [
                    {
                        "name": "soarenHelps",
                        "text": "You cry to Soaren for help. 'Worry not, little one!' says the owl, 'I am here!' He swoops in and catches the falcon with his talons."
                    },
                    {
                        "name": "falconEvade",
                        "text": "The falcon screeches and tries to escape. Soaren lets go of the falcon, and it flies away."
                    },
                    {
                        "name": "soarenIntro",
                        "text": "Your journey continues and you ask the owl for his name. He tells you that his name is Soaren, Guardian of the forest. He reveals that his brothers and sisters are also guardians; they keep watch at night."
                    },
                    {
                        "name": "tarantulaFightIntro",
                        "text": "Soaren then suggests that you stop to get some rest. When you settle under the shade of a tall tree, you spot a tarantula, who crawls up to you, preparing to attack."
                    },
                    // DISABLE CONTINUE BUTTON
                    {
                        "name": "tarantulaEncounter",
                        "text": "What is your next move? (Choose an option from ACT)",
                        choices: [["Hit the tarantula", "tarantulaOwRunAway"],["Impress Soaren", "impressSoaren"],["Blow a Gust of Wind", "tarantulaFliesAway"]]
                    }
                    // ENABLE CONTINUE BUTTON
                  ],

                  "evadeFalcon": [
                    {
                        "name": "evasion",
                        "text": "You and Soaren evade the falcon and fly away. The falcon doesn't seem to care anymore, and he doesn't chace you."
                    },
                    {
                        "name": "soarenIntro",
                        "text": "Your journey continues and you ask the owl for his name. He tells you that his name is Soaren, Guardian of the forest. He reveals that his brothers and sisters are also guardians; they keep watch at night."
                    },
                    {
                        "name": "tarantulaFightIntro",
                        "text": "Soaren then suggests that you stop to get some rest. When you settle under the shade of a tall tree, you spot a tarantula, who crawls up to you, preparing to attack."
                    },
                    // DISABLE CONTINUE BUTTON
                    {
                        "name": "tarantulaEncounter",
                        "text": "What is your next move? (Choose an option from ACT)",
                        choices: [["Hit the tarantula", "tarantulaOwRunAway"],["Impress Soaren", "impressSoaren"],["Blow a Gust of Wind", "tarantulaFliesAway"]]
                    }
                    // ENABLE CONTINUE BUTTON
                  ],

                  "tarantulaOwRunAway": [
                    {
                        "name": "tarantulaHit",
                        "text": "You hit the tarantula with your little leg. 'AHHH!' yells the tarantula."
                    },
                    {
                        "name": "tarantulaWife",
                        "text": "'Hey Kyle!' screams a voice from below, 'Keep it down up there, will you?'"
                    },
                    {
                        "name": "tarantulaResponse",
                        "text": "'Honey,' answers the tarantula, 'There's a little bird up there, and he just hit me!'"
                    },
                    {
                        "name": "tarantulaWifeResponse",
                        "text": "'Well you better quiet down, Kyle! I’m trying to sleep!'"
                    },
                    {
                        "name": "tarantulaSnaps",
                        "text": "'Man, thanks a lot, pal!' says the tarantula, and crawls away."
                    },
                    {
                        "name": "soarenRemark",
                        "text": "'That was a close one!' Soaren says. 'But you’re safe. Let's rest a bit more, and then we will proceed our journey.'"
                    },
                    {
                        "name": "mountainApproach",
                        "text": "After getting some rest, you fly off once more. The sun is beginning to set, and Soaren tells you that you are approaching the mountain range, which is sitting right above the forest where your father and brother are. (Choose an option from ACT).",
                        choices: [["Approcah the mountain", "approachMountain"]]
                    },
                  ],

                  "impressSoaren": [
                    {
                        "name": "impressSoarenWithATrick",
                        "text": "You try to impress Soaren with a trick. You fly up and do a loop-de-loop, but you end up crashing into a tree."
                    },
                    {
                        "name": "tarantulaLaughs",
                        "text": "'Ha-ha-ha! That was funny!' says the tarantula. 'You should try that again!'"
                    },
                    {
                        "name": "tarantulaLaughs",
                        "text": "'Man,' says the tarantula, 'I don't even want to attack you anymore. That was hilarious!' The tarantula then crawls away."
                    },
                    {
                        "name": "soarenRemarkToTrick",
                        "text": "'That was quite remarkable!' Soaren says. 'But you should be careful next time. I promised your mother to keep you safe.'"
                    },
                    {
                        "name": "soarenRest",
                        "text": "You get down from the tree, and take a quick break from the journey."
                    },
                    {
                        "name": "mountainApproach",
                        "text": "After getting some rest, you fly off once more. The sun is beginning to set, and Soaren tells you that you are approaching the mountain range, which is sitting right above the forest where your father and brother are. (Choose an option from ACT).",
                        choices: [["Approcah the mountain", "approachMountain"]]
                    },
                  ],

                  "tarantulaFliesAway": [
                    {
                        "name": "gustOfWind",
                        "text": "You fly up and blow a gust of wind at the tarantula with your wings. The tarantula flies away, as if he were a little leaf poofing away. The tarantula vanishes into the distance."
                    },
                    {
                        "name": "soarenRemarkGust",
                        "text": "'Woah, you are quite the strong one, aren't you?' Soaren says. 'For a little bird like you, you've got quite the wing muscles. But you should give them some rest. We still have a long ways to go!'"
                    },  
                    {
                        "name": "mountainApproach",
                        "text": "After getting some rest, you fly off once more. The sun is beginning to set, and Soaren tells you that you are approaching the mountain range, which is sitting right above the forest where your father and brother are. (Choose an option from ACT).",
                        choices: [["Approcah the mountain", "approachMountain"]]
                    },
                  ],

                  "approachMountain": [
                    {
                    "name": "soarenRevealsTruth",
                    "text": "You are now getting closer and closer to the mountain.You finally ask Soaren about what really happened to them. He urges you not to panic but to stay calm, and he admits to you that they have been captured by falcons."
                    },
                    {
                    "name": "soarenEncourages",
                    "text": "Soaren reveals that the reason why he didn’t explain this earlier was because he didn’t want you to get scared, but the owl encourages you."
                    },
                    {
                    "name": "soarenEncouragement",
                    "text": "'Cheer up, little one!' says the owl 'I know that we can save them. You are quite a brave little bird! You've gotten this far! I know you can rescue your brethren!'"
                    },                      
                    {
                    "name": "strongFalconBattleIntro",
                    "text": "Suddenly you see a strong falcon approaching, and he seems intimidating. He is much bigger than you, and he looks like he has been training for a long time. He is flying towards you, and he seems to be angry."
                    },

                    // DISABLE CONTINUE BUTTON
                    {
                    "name": "callToAction",
                    "text": "What is your next move? (Choose an option from ACT)",
                    choices: [["Hit the falcon", "hitStrongFalcon"],["Tell a joke", "joke"]]
                    },
                    // ENABLE CONTINUE BUTTON
                ],

                 "joke": [
                    {
                    "name": "tellAJoke",
                    "text": "You tell the falcon that you would like to tell him a joke.",
                    },
                    {
                    "name": "falconRespondsOutOfCuriosity",
                    "text": "'What? A joke?' the falcon asks, 'I’m listening. Go ahead, tell me a joke!'",
                    },
                    {
                    "name": "theJoke",
                    "text": "'Why did the falcon cross the road?'",
                    },
                    {
                    "name": "theAttemptToAnswer",
                    "text": "I don't know, why?' the falcon asks.",
                    },
                    {
                    "name": "jokeEnd",
                    "text": "'Because it saw the chicken do it and thought, “Amateur.”'",
                    },
                    {
                    "name": "falconLaugh",
                    "text": "Suddenly, the falcon bursts out laughing like crazy. 'BWA-HA-HA-HA!' he laughs. 'That was the funniest thing I’ve heard all day!'",
                    },
                    {
                    "name": "falconFall",
                    "text": "Because he is so focused on laughing, he loses control of his flight and begins to abnoxiously fall to the ground. You watch him descend, laughing, until you hear a loud thud. 'I'm okay...' says the falcon.",
                    },
                    {
                    "name": "soarenRemark3",
                    "text": "'Wow,' says Soaren, 'you are quite the comedian! Your joke was so effective that it made our enemy abnoxious to his actions, causing him to gradually fall to the ground without a care in the world. Jolly good! Jolly good!'",
                    },
                    {
                    "name": "mountain1",
                    "text": "You then fly your last few meters to the mountain, until you finally reach it.",
                    },
                    {
                    "name": "mountain2",
                    "text": "You notice that the mountain has a giant hole in it. It is a cave system.",
                    },
                    {
                    "name": "soarenMountain",
                    "text": "'We're almost there, little one. We just have to go through this cave. The mountain is too high for us to go above or around it, so we must go through. Are you ready?' (Choose an option from ACT)",
                    choices: [["Enter the cave", "enterTheCave"]]
                    }
                ],

                "hitStrongFalcon": [
                    {
                    "name": "hitTheStrongFalcon",
                    "text": "You knock on the strong falcon with your beak, but he barely feels it. It's as if he's made of steel.",
                    },
                    {
                    "name": "strongFalconResponce",
                    "text": "'That did nothing,' the falcon says. He then proceeds to make a slashing movement at you with his big talon.",
                    },
                    {
                    "name": "soarenProtection",
                    "text": "'AWAY, YOU SCOUNDREL!' says Soaren, coming to your rescue. He then shouts a battle cry: 'SCREECHING NIGHTWING!'",
                    },
                    {
                    "name": "sonicBoom",
                    "text": "Soaren then yells a shrill screech that peirces through the forest, and makes the mountains rumble. It is so loud, that you shut your ears with your wings for a bit. The screech coming from Soaren's beak makes a sonic boom.",
                    },
                    {
                    "name": "shreikStop",
                    "text": "The strong falcon's eardrums go numb. He becomes unconscious and falls to the ground.",
                    },
                    {
                    "name": "yourReaction",
                    "text": "You take your wings off your ears and look at Soaren. You express your sincerest gratitude to him for saving you.",
                    },
                    {
                    "name": "soarenResponse5",
                    "text": "'You are welcome, little one,' says Soaren. 'You could have been hurt! I'm glad that that pesky bird has been taken care of, but come. Let us proceed.'",
                    },
                    {
                    "name": "mountain1",
                    "text": "You then fly your last few meters to the mountain, until you finally reach it.",
                    },
                    {
                    "name": "mountain2",
                    "text": "You notice that the mountain has a giant hole in it. It is a cave system.",
                    },
                    {
                    "name": "soarenMountain",
                    "text": "'We're almost there, little one. We just have to go through this cave. The mountain is too high for us to go above or around it, so we must go through. Are you ready?' (Choose an option from ACT)",
                    choices: [["Enter the cave", "enterTheCave"]]
                    }
                ],
                //   If the player chooses "Decline the owl's request" in startChoices, then this text will apply:
                "rejectingTheCall": [
                    {
                    "name": "rejectStart",
                    "text": "If you decline the owl’s request to go with him, he flies away, but not before giving you directions on where you can find him if you change your mind. In two days, you decide to follow the owl.",
                    choices: [["Begin your journey", "mergingPaths"]]
                    }
                ],

                //   If the player chooses "Think about it" in startChoices, then this text will apply:
                "pathOfContemplation": [
                    {
                    "name": "contemplationIntro",
                    "text": "You exit the scene, leaving the owl and your mother behind, to take a 'stroll' and get some fresh air while you contemplate the owl’s request.",
                    choices: [["Continue thinking", "mergingPaths"]]
                    }
                ],
                // The next scenes are the same for both "Think about it" and "Decline the owl's request"
                "mergingPaths": [
                    {
                        "name": "falconAmbushDuringContemplation",
                        "text": "You are currently flying, when suddenly, a falcon swoops down to attack you."
                    },
                    // DISABLE CONTINUE BUTTON
                    {
                    "name": "ambushFalconCallToAction",
                    "text": "What is your next move? (Choose an option from ACT)",
                    choices: [["Dodge The falcon", "hitFalcon"],["Talk to the falcon", "talkToFalcon"],["Evade the falcon", "evadeFalcon2"]]
                    } 
                ],
            
            // CONTINUE HERE
            "hitFalcon": [
                    {
                    "name": "hitFalconFail",
                    "text": "You try to hit the falcon, but he dodges your attack. He then prepares to slash you with his claw."
                    },
                    {
                    "name": "owlRescue",
                    "text": "Suddenly, the owl from earlier swoops in and catches you. He makes a dodging move, and you both evede the falcon."
                    },
                    {
                    "name": "owlCheckIn",
                    "text": "The owl asks: 'Are you hurt, little one?'"
                    },
                    {
                    "name": "talkResponse",
                    "text": "You tell the owl you're okay, and you thank him for saving you. He replies: 'You are welcome. Relax while I take you to my hideout.' You then begin to shut your eyes from exhaustion. You slowly begin to fade into a deep sleep."
                    },
                    {
                    "name": "wakeUpScene",
                    "text": "You wake up in a dark, abandoned watchtower. You are confused as to what is happening."
                    },
                    {
                    "name": "lookAroundTheWatchtower",
                    "text": "You look around. There's a fireplace and a bundle of seeds before you. You also see the owl who saved you. He is staring into the night."
                    },
                    {
                    "name": "callToAction",
                    "text": "What is your next move? (Choose an option from ACT)",
                    choices: [["Eat the seeds", "eatTheSeeds"],["Talk to the owl", "talkToOwl"],["Explore the room", "exploreRoom"]]
                    },
            ],

            "talkToFalcon": [
                    {
                    "name": "rejectTalk1",
                    "text": "You try to convince the falcon to stop attacking. The falcon snaps: 'Quiet, little redwing. You shall be my supper!'"
                    },
                    {
                    "name": "rejectTalk2",
                    "text": "You try talking again. The falcon replies: 'Why should I stop? You look too tasty!' He prepares to slash you with his claw."
                    },
                    {
                    "name": "owlRescue",
                    "text": "Suddenly, the owl from earlier swoops in and catches you. He makes a dodging move, and you both evede the falcon."
                    },
                    {
                    "name": "owlCheckIn",
                    "text": "The owl asks: 'Are you hurt, little one?'"
                    },
                    {
                    "name": "talkResponse",
                    "text": "You tell the owl you're okay, and you thank him for saving you. He replies: 'You are welcome. Relax while I take you to my hideout.' You then begin to shut your eyes from exhaustion. You slowly begin to fade into a deep sleep."
                    },
                    {
                    "name": "wakeUpScene",
                    "text": "You wake up in a dark, abandoned watchtower. You are confused as to what is happening."
                    },
                    {
                    "name": "lookAroundTheWatchtower",
                    "text": "You look around. There's a fireplace and a bundle of seeds before you. You also see the owl who saved you. He is staring into the night."
                    },
                    {
                    "name": "callToAction",
                    "text": "What is your next move? (Choose an option from ACT)",
                    choices: [["Eat the seeds", "eatTheSeeds"],["Talk to the owl", "talkToOwl"],["Explore the room", "exploreRoom"]]
                    },
            ],

            // CONTINUE HERE 
            "evadeFalcon2": [
                    {
                    "name": "evadeFail",
                    "text": "You dodge the falcon, who is diving into you. You look back at the falcon, still flying, and not looking at what is in front of you. Suddenly, you hit a tree. BAM!!!"
                    },
                    {
                    "name": "silence1",
                    "text": ".  .  ."
                    },
                    {
                    "name": "silence2",
                    "text": ".  .  ."
                    },
                    {
                    "name": "wakeUpScene",
                    "text": "You wake up in a dark, abandoned watchtower. You are confused as to what is happening. You don't remember how you got here."
                    },
                    {
                    "name": "lookAroundTheWatchtower",
                    "text": "You look around. There's a fireplace and a bundle of seeds before you. You also see the owl who saved you. He is staring into the night."
                    },
                    {
                    "name": "callToAction",
                    "text": "What is your next move? (Choose an option from ACT)",
                    choices: [["Eat the seeds", "eatTheSeeds"],["Talk to the owl", "talkToOwl"],["Explore the room", "exploreRoom"]]
                    },
            ],

            "eatTheSeeds": [
                {
                    "name": "watchtowerEat",
                    "text": "You eat the seeds and regain strength. You suddenly feel more alive, like a weight has been taken off your back.",
                },
                    {
                    "name": "watchtowerTalk",
                    "text": "The owl hears you eating and turns to you. 'Ah! You’re awake.' he says, 'Welcome to my cozy nest. Make yourself at home! But don't get too comfortable: we’ve got a big journey ahead of us!'",
                    choices: [["'What is your name?'", "askForName"],["'What journey?'", "askAboutJourney"]]
                    },
            ],

            "talkToOwl": [
                {
                    "name": "watchtowerTalkToOwl",
                    "text": "You ask the owl about where you are. He turns to you in surprize."
                },
                {
                    "name": "watchtowerTalk",
                    "text": "'Ah! You’re awake.' he says, 'You are currently in my cozy nest. Make yourself at home! But don't get too comfortable: we’ve got a big journey ahead of us!'",
                    choices: [["'What is your name?'", "askForName"],["'What journey?'", "askAboutJourney"]]
                },
            ],

            "exploreRoom": [
                {
                    "name": "watchtowerExplore",
                    "text": "You look around the room, and you see bookcases, filled to the brim with books of all sorts. 'Quite a wise owl,' you think to yourself. You also see a picture of two owls. One of them is your rescuer, the very same owl who has just saved you from danger."
                },
                {
                    "name": "owlNotice",
                    "text": "Suddenly you hear him speaking to you from the entrance of the watchtower."
                },
                {
                    "name": "watchtowerTalk",
                    "text": "'Ah! You’re awake.' he says, 'Welcome to my cozy nest. Make yourself at home! But don't get too comfortable: we’ve got a big journey ahead of us!'",
                    choices: [["'What is your name?'", "askForName"],["'What journey?'", "askAboutJourney"]]
                },
            ],
            
            "askForName" : [
                {
                    "name": "askForNamE",
                    "text": "You ask the Owl for his name. He replies: 'My name is Soaren, Guardian of the forest. I am here to help you find your father and brother.'",
                    choices: [["'Good to meet you.'", "mergingPathsWatchtower"]]
                },
            ],

             "askAboutJourney" : [
                {
                    "name": "clarifyTheJourney",
                    "text": "You move closer and ask what he means by 'start our journey.' The owl replies: 'I mean that we will begin our journey to find your father and brother, of couse!'",
                    choices: [["'Oh, alright.'", "mergingPathsWatchtower"]]

                },
            ],
            "mergingPathsWatchtower" : [
                    {
                    "name": "watchtowerTalk3",
                    "text": "The owl chuckles. 'It'm glad to have met you, little redwing.'"
                    },
                    {
                    "name": "questBegins",
                    "text": "'We must leave tonight,' he says, 'The sooner we get to your brethren, the sooner we'll rescue them'."
                    },
                    {
                    "name": "peacefulFlight",
                    "text": "In a few moments, you begin your journey. After flying for 30 minutes in the chilly night, you approach a mountain."
                    },
                    {
                    "name": "soarenClarifiesLocation",
                    "text": "'Your brothers are beyond this mountain,' says Soaren, 'They are located in a lush evergreen forest. Come, there's no time to waste!'"
                    },
                     {
                    "name": "strongFalconBattleIntro",
                    "text": "Suddenly you see a strong falcon approaching, and he seems intimidating. He is much bigger than you, and he looks like he has been training for a long time. He is flying towards you, and he seems to be angry."
                    },

                    // DISABLE CONTINUE BUTTON
                    {
                    "name": "callToAction",
                    "text": "What is your next move? (Choose an option from ACT)",
                    choices: [["Hit the falcon", "hitStrongFalcon"],["Tell a joke", "joke"]]
                    },
                ],  
                // Text for The Cave Scene:
                    "enterTheCave": [
                    {
                    "name": "caveArrival",
                    "text": "You fly into the cave that goes through the mountain."
                    },
                    {
                    "name": "caveActions",
                    "text": "As you enter, you see that there is a little door to the side of the cave, leading into a room. You consider wether you should explore the room or continue through the cave. What will you choose?",
                    choices: [["Explore", "explore"],["Continue", "giantTarantulaBossfight"]]
                    }
                ],
                    "explore": [
                      {
                        "name": "exploreCave",
                        "text": "You decide to open the door and explore the room. You find a treasure chest. You open it and find a book titled 'The Redwing’s Journal.' Would you like to read it?",
                        choices: [["Yes", "yes"], ["No", "no"]]
                      },
                    ],
                    "yes": [
                        {
                            "name": "readJournal",
                            "text": "You open the book and turn to a random page. You land on page 26 and read an excerpt from it: 'The falcons! They're everywhere! We are hiding from them in this cave, and we beleive that--' You quickly turn a few pages over and continue reading:",
                        },
                        {
                            "name": "readJournal2",
                            "text": "'...and they seemed to have gone northwards, according to our scouts. However, I felt a slight suspicion in what they said, for it was the falcons, after all. I beleived that we should have stayed in the cave, but our flock leader told us that we should keep moving, despite the fact that-' You close the book, feeling a fear growing in you. Yet, due to your courage, you brushed that feeling off of you like dust."
                        },
                        {
                            "name": "readJournal3",
                            "text": "You then put the book back in the chest and close it. You decide to tell Soaren what you have found, and what you have read about in the book..."
                        },
                        {
                            "name": "soarenTalkCave",
                            "text": "'It is as I have told you,' said the owl, 'They've been captured by the falcons, but take courage! I am with you. I will fight alongside you, and I will help you save them, but before then, we must get out of this cave!'",
                            choices: [["Continue", "giantTarantulaBossfight"]]
                        }
                    ],
                    "no": [
                        {
                            "name": "ignoreJournal",
                            "text": "You ignore the journal and close the chest. You decide to move on.",
                            choices:["Continue", "giantTarantulaBossfight"]
                        }
                    ],
                // Text for Giant Tarantula Bossfight:
                "giantTarantulaBossfight": [
                    {
                    "name": "giantTarantulaIntro",
                    "text": "You continue traversing the cave, and you fly into a giant, dark room. It’s quiet at first, but suddenly you hear a loud, coarse screeching noise.",
                    },
                    {
                    "name": "giantTarantulaBeforeYou",
                    "text": "You realize that there is a giant tarantula in the room, six times bigger than you and Soaren combined."
                    },
                    {
                    "name": "tarantulaSpeaks",
                    "text": "The tarantula speaks to you: 'To pass through the cave, you must solve my riddle!'"
                    },
                    {
                    "name": "soarenRiddle",
                    "text": "'Ah, riddles!' says Soaren, 'Solving riddles happens to be my strongpoint.'"
                    },
                    {
                    "name": "webAttack",
                    "text": "'Don't worry, little one. I will help you solve the-- suddenly, the tarantula shoots a web at Soaren, and he is now attached to the wall.'",
                    },
                    {
                    "name": "soarenStuck",
                    "text": "He tries to speak, but his speech is muffled. His beak is stuck in the web.",
                    },
                    {
                    "name": "tarantulaYourOnYourOwn",
                    "text": "'Your on your own, kid,' says the tarantula. 'Solve my riddle, and I will let you pass. If you fail, I will eat you both! Are you ready?'",
                    choices: [["Bring it on!", "bringItOn"]]
                    },
                ],
                "bringItOn": [
                    {
                    "name": "riddleBegin",
                    "text": "The tarantula begins his riddle:",
                    },
                    {
                    "name": "tarantulaRiddleInAction",
                    "text": "'I have no legs, yet I race through the land. I leave no mark, yet I cradle the sand. I whisper by night and howl by day— Catch me if you can, I’ll never stay.'",
                    },
                    {
                    "name": "provideAnAnswer",
                    "text": "'What am I?' asks the tarantula. You come up with three possible solutions, but only one of them is correct. What will you choose?",
                    choices: [["Option 1 - A shadow", "shadow"], ["Option 2 - A snake", "snake"], ["Option 3 - The wind", "wind"]], 
                    },
                ],
                "wind": [
                    {
                    "name": "riddleAnswer",
                    "text": "You answer the riddle with 'The wind.'",
                    },
                    {
                    "name": "tarantulaResposeGood",
                    "text": "The tarantula stands for a few moments, speechless. 'Wow,' he says, 'That was actually correct! I am impressed!'",
                    },
                    {
                    "name": "tarantulaResposeGood2",
                    "text": "He then turns to your friend, 'Alright, I will let you two pass, but first, I will free your friend.'",
                    },
                    {
                    "name": "tarantulaResposeGood3",
                    "text": "The tarantula crawls up to Soaren and frees him from the web. 'You are free, wise owl,' he says. 'Now go, and take your friend with you.'",
                    },
                    {
                    "name": "soarenThanks",
                    "text": "Soaren brushes away the remains of the web. 'Good job, little one!' he says. 'You solved the riddle, and you saved our lives!'",
                    },
                    {
                    "name": "youEscape",
                    "text": "You then leave the tarantula dissapointed, and leave the giant room. You now approach the extit. 'This is it,' you think to yourself.",
                    choices: [["Exit the cave", "theClimax"]]
                    },
                ],
                "shadow": [
                    {
                    "name": "riddleAnswer",
                    "text": "You answer the riddle with 'A shadow.'",
                    },
                    {
                    "name": "tarantulaResposeToDeath",
                    "text": "'Incorrect!' says the tarantula. 'You are wrong! You have failed my riddle, and now I will eat you!'",
                    },
                    {
                    "name": "tarantulaAttacksToDeath",
                    "text": "The tarantula launches a web at you, and you are stuck. The tarantula then creeps up to you. 'Sorry, kid. I'm just kinda hungry, that's all.'",
                    },
                    {
                    "name": "death",
                    "text": "At this point, you are certain of death, and the last thing you remember before shutting your eyes is the awful fangs of a giant vermin.",
                    choices:[["Restart Riddle", "bringItOn"], ["End the game", "gameOver"]]
                    },
                ],
                "snake": [
                    {
                    "name": "riddleAnswer",
                    "text": "You answer the riddle with 'A snake.'",
                    },
                    {
                    "name": "tarantulaResposeToDeath",
                    "text": "'Incorrect!' says the tarantula. 'You are wrong! You have failed my riddle, and now I will eat you!'",
                    },
                    {
                    "name": "tarantulaAttacksToDeath",
                    "text": "The tarantula launches a web at you, and you are stuck. The tarantula then creeps up to you. 'Sorry, kid. I'm just kinda hungry, that's all.'",
                    },
                    {
                    "name": "death",
                    "text": "At this point, you are certain of death, and the last thing you remember before shutting your eyes is the awful fangs of a giant vermin.",
                    choices:[["Restart Riddle", "bringItOn"], ["End the game", "gameOver"]]
                    },
                ],
                
                // Text for The Climax
                "theClimax": [
                {
                "name": "exit",
                "text": "You fly out of the cave, and you look before you.",
                },
                {
                "name": "burningForest",
                "text": "You approach a forest, but you see that it is burning."
                },
                {
                "name": "soarenSurprise",
                "text": "'Oh no,' exlaims Soaren in surprize, 'What is this!' You both feel a sence immense danger.",
                },
                {
                "name": "dive",
                "text": "The two of you dive down and find a dry place to land with no fire. You find your father, brother, and the rest of the redwing squadron, but they are wounded by strong falcons, and some are even held captive in wooden cages."
                },
                {
                "name": "moveToFam",
                "text": "You come closer to your father and brother."
                },
                {
                "name": "dialogue",
                "text": "'Son!' your father exclaims, 'You’re here! You should have stayed home, where it was safe.'"
                },
                {
                "name": "brother",
                "text": "'It’s good to see you, Red,” says your brother, “but dad’s right. You should have stayed home and helped mom."
                },
                {
                "name": "climaxFalconTrio",
                "text": "You suddenly notice three big falcons swooping down from the sky. They land right next to you. They begin to bully you and pick on you."
                },
                {
                "name": "soarenDisrespect",
                "text": "'WHAT DISRESPECT!' says Soaren, 'You will pay for your injustice!' He then flies up to them, but one of the falcons slashes him with his claw. Soaren is now unconcious." 
                },
                {
                "name": "ohNo",
                "text": "'OH NO!' exclaims your father and brother.'" 
                },
                {
                "name": "falconsAreGettingTHere",
                "text": "The falcons are getting more and more violent. They are picking on you, calling you names." 
                },
                {
                "name": "defendYourself",
                "text": "Suddenly, you feel a rush of courage in your heart. You want to defend yourself, but how will you do it?",
                choices: [["Let out a deafening screech","screech"],["Slash the falcons with your talons", "talons"],["Plummet the falcons with your beak", "beak"]]
                },
             ],

             "screech":[
                {
                "name": "letItOUt",
                "text": "You fly up to the sky, turn to the falcons, and let out a deafening screech. The sound coming from your beak pierces the sound barrier." 
                },
                {
                "name": "fear",
                "text": "The three falcons are petrified. The stand there for a few moments, and then they start to scream. 'RUN FOR IT!' they say to each other." 
                },
                {
                "name": "screamFalcons",
                "text": "The rest of the falcons notice the commotion they are making and begin to scream as well. 'RUN, ESCAPE!' they scream to each other." 
                },
                {
                "name": "falconEscape",
                "text": "They all frantically gather together into a flock, panicking, and fly away. All of the falcons are now gone."
                },
                {
                "name": "crowdGoesWild",
                "text": "And then… the crowd goes wild. The captive redwings are now free! You saved them all! You are a HERO! Everyone flies to you, lifting you up from the ground and tossing you into the air. The crowd chants: “Hoorah for Little Red! Hoorah for Little Red!”",
                },
                {
                "name": "proud",
                "text": "“I'm proud of you, son,” says your dad, “You saved us from danger.”",
                },
                {
                "name": "yeahRed",
                "text": "“Yeah, Red,” says your brother, “That was sick! I didn’t know you were so good at fighting!”",
                },
                {
                "name": "noticeSoaren",
                "text": "You notice Soaren waking up from his uncouncousness. You jump away from the crowd and come up to him, wondering if he's okay.",
                },
                {
                "name": "soarenWake",
                "text": "'I'm all right,' he says, as he gets up. He then calls to the redwings: 'Fellow birds, let's save ourselves! The forest is burning! I can get you all out of here, just follow my lead!' Soaren then gathers up all of the redwings, and together, you all begin to escape the burning forest.",
                },
                {
                    "name": "flockRush",
                    "text": "Soaren directs everyone to follow his movements: “This way!” he shouts, as you approach the exit. You are following close behind everybody, and your brother and father are right in front of you. Suddenly, a colossal tree begins to fall on everyone."
                },
                {
                    "name": "soarenShoutHurry",
                    "text": "“HURRY!” shouts the owl, “WE CAN STILL MAKE IT!” Everybody gets away, to the other side, but you are behind everybody, trying the best you can to get close to the group, but you are too slow."
                },
                {
                    "name": "finalVerdict",
                    "text": "YOU NOW SEE THE TREE FALLING ON YOU. You can still make it across, but you also see a hole in the ground beneath you."
                },
                {
                    "name": "finalVerdictUltimate",
                    "text": "You now have three options: you can either get back and fly in the opposite direction, away from the flock; you can plunge down into the hole beneath you, or you can follow the rest and cross to the other side. What will you do?",
                    choices: [["Follow the flock", "follow"], ["Plunge down into the hole", "plungeDown"], ["Get back", "getBack"]]
                },
                // TEXT
                // {
                //     "“I knew you could do it, little redwing,” says Soaren, “after everything we’ve been through together, this was one of the greatest battles we’ve ever fought. Well done!”\nAs the crowd thanks you, you are reminded of the fact that the tall trees surrounding you are still burning. They are like tall towers, imposing themselves over you and your friends.\nAnd then, realization hits you… the trees are collapsing. \n“THE TREES!” shouts Featherfoot “THEY ARE FALLING ON US!”\nThe flock starts to panic, but in the same instant, everyone goes airborne.\n“Hurry, son!” your father shouts. \nYou follow suit.\nEvery tree in the forest is now crashing, one by one. However, your flock is led by Soaren, who is a master at maneuvering. He directs everyone to follow his movements:\n“This way!” he shouts, as you approach the exit.\nYou are following close behind everybody, and your brother and father are right in front of you. Suddenly, a colossal conifer begins to topple over everyone.\n“HURRY!” shouts the owl, “WE CAN STILL MAKE IT!”\nEverybody gets away, to the other side, but you are behind everybody, trying the best you can to get close to the group, but you are too slow. \nYOU NOW SEE THE TREE FALLING ON YOU. You can still make it across, but you also see a hole in the ground beneath you. \nYOU HAVE SIX SECONDS TO MAKE YOUR NEXT MOVE.\nYou are now presented with three options: you can either get back and fly in the opposite direction, away from the flock; you can plunge down into the hole beneath you, or you can follow the rest and cross to the other side."
                // }
             ],

             "talons":[
                {
                "name": "hit",
                "text": "You jump up and do multiple quick, sharp slashes at the falcons. You are so quick that the falcons cannout fight back. You deal quite a lot of damage to them; they are now bruised and wounded." 
                },
                {
                "name": "fear",
                "text": "The three falcons are petrified. The stand there for a few moments, and then they start to scream. 'RUN FOR IT!' they say to each other." 
                },
                {
                "name": "screamFalcons",
                "text": "The rest of the falcons notice the commotion they are making and begin to scream as well. 'RUN, ESCAPE!' they scream to each other." 
                },
                {
                "name": "falconEscape",
                "text": "They all frantically gather together into a flock, panicking, and fly away. All of the falcons are now gone."
                },
                {
                "name": "crowdGoesWild",
                "text": "And then… the crowd goes wild. The captive redwings are now free! You saved them all! You are a HERO! Everyone flies to you, lifting you up from the ground and tossing you into the air. The crowd chants: “Hoorah for Little Red! Hoorah for Little Red!”",
                },
                {
                "name": "proud",
                "text": "“I'm proud of you, son,” says your dad, “You saved us from danger.”",
                },
                {
                "name": "yeahRed",
                "text": "“Yeah, Red,” says your brother, “That was sick! I didn’t know you were so good at fighting!”",
                },
                {
                "name": "noticeSoaren",
                "text": "You notice Soaren waking up from his uncouncousness. You jump away from the crowd and come up to him, wondering if he's okay.",
                },
                {
                "name": "soarenWake",
                "text": "'I'm all right,' he says, as he gets up. He then calls to the redwings: 'Fellow birds, let's save ourselves! The forest is burning! I can get you all out of here, just follow my lead!' Soaren then gathers up all of the redwings, and together, you all begin to escape the burning forest.",
                },
                {
                    "name": "flockRush",
                    "text": "Soaren directs everyone to follow his movements: “This way!” he shouts, as you approach the exit. You are following close behind everybody, and your brother and father are right in front of you. Suddenly, a colossal tree begins to fall on everyone."
                },
                {
                    "name": "soarenShoutHurry",
                    "text": "“HURRY!” shouts the owl, “WE CAN STILL MAKE IT!” Everybody gets away, to the other side, but you are behind everybody, trying the best you can to get close to the group, but you are too slow."
                },
                {
                    "name": "finalVerdict",
                    "text": "YOU NOW SEE THE TREE FALLING ON YOU. You can still make it across, but you also see a hole in the ground beneath you."
                },
                {
                    "name": "finalVerdictUltimate",
                    "text": "You now have three options: you can either get back and fly in the opposite direction, away from the flock; you can plunge down into the hole beneath you, or you can follow the rest and cross to the other side. What will you do?",
                    choices: [["Follow the flock", "follow"], ["Plunge down into the hole", "plungeDown"], ["Get back", "getBack"]]
                },
                // TEXT
                // {
                //     "“I knew you could do it, little redwing,” says Soaren, “after everything we’ve been through together, this was one of the greatest battles we’ve ever fought. Well done!”\nAs the crowd thanks you, you are reminded of the fact that the tall trees surrounding you are still burning. They are like tall towers, imposing themselves over you and your friends.\nAnd then, realization hits you… the trees are collapsing. \n“THE TREES!” shouts Featherfoot “THEY ARE FALLING ON US!”\nThe flock starts to panic, but in the same instant, everyone goes airborne.\n“Hurry, son!” your father shouts. \nYou follow suit.\nEvery tree in the forest is now crashing, one by one. However, your flock is led by Soaren, who is a master at maneuvering. He directs everyone to follow his movements:\n“This way!” he shouts, as you approach the exit.\nYou are following close behind everybody, and your brother and father are right in front of you. Suddenly, a colossal conifer begins to topple over everyone.\n“HURRY!” shouts the owl, “WE CAN STILL MAKE IT!”\nEverybody gets away, to the other side, but you are behind everybody, trying the best you can to get close to the group, but you are too slow. \nYOU NOW SEE THE TREE FALLING ON YOU. You can still make it across, but you also see a hole in the ground beneath you. \nYOU HAVE SIX SECONDS TO MAKE YOUR NEXT MOVE.\nYou are now presented with three options: you can either get back and fly in the opposite direction, away from the flock; you can plunge down into the hole beneath you, or you can follow the rest and cross to the other side."
                // }
             ],

            "beak":[
                    {
                "name": "hitWithBeak",
                "text": "You lauch a barrage of beak-pecking madness at the falcons. You hit them over 400 hundred times in a matter of seconds. Your movements are too quick to comprehend, and so you beat up the big bullies." 
                },
               {
                "name": "fear",
                "text": "The three falcons are petrified. The stand there for a few moments, and then they start to scream. 'RUN FOR IT!' they say to each other." 
                },
                {
                "name": "screamFalcons",
                "text": "The rest of the falcons notice the commotion they are making and begin to scream as well. 'RUN, ESCAPE!' they scream to each other." 
                },
                {
                "name": "falconEscape",
                "text": "They all frantically gather together into a flock, panicking, and fly away. All of the falcons are now gone."
                },
                {
                "name": "crowdGoesWild",
                "text": "And then… the crowd goes wild. The captive redwings are now free! You saved them all! You are a HERO! Everyone flies to you, lifting you up from the ground and tossing you into the air. The crowd chants: “Hoorah for Little Red! Hoorah for Little Red!”",
                },
                {
                "name": "proud",
                "text": "“I'm proud of you, son,” says your dad, “You saved us from danger.”",
                },
                {
                "name": "yeahRed",
                "text": "“Yeah, Red,” says your brother, “That was sick! I didn’t know you were so good at fighting!”",
                },
                {
                "name": "noticeSoaren",
                "text": "You notice Soaren waking up from his uncouncousness. You jump away from the crowd and come up to him, wondering if he's okay.",
                },
                {
                "name": "soarenWake",
                "text": "'I'm all right,' he says, as he gets up. He then calls to the redwings: 'Fellow birds, let's save ourselves! The forest is burning! I can get you all out of here, just follow my lead!' Soaren then gathers up all of the redwings, and together, you all begin to escape the burning forest.",
                },
                {
                    "name": "flockRush",
                    "text": "Soaren directs everyone to follow his movements: “This way!” he shouts, as you approach the exit. You are following close behind everybody, and your brother and father are right in front of you. Suddenly, a colossal tree begins to fall on everyone."
                },
                {
                    "name": "soarenShoutHurry",
                    "text": "“HURRY!” shouts the owl, “WE CAN STILL MAKE IT!” Everybody gets away, to the other side, but you are behind everybody, trying the best you can to get close to the group, but you are too slow."
                },
                {
                    "name": "finalVerdict",
                    "text": "YOU NOW SEE THE TREE FALLING ON YOU. You can still make it across, but you also see a hole in the ground beneath you."
                },
                {
                    "name": "finalVerdictUltimate",
                    "text": "You now have three options: you can either get back and fly in the opposite direction, away from the flock; you can plunge down into the hole beneath you, or you can follow the rest and cross to the other side. What will you do?",
                    choices: [["Follow the flock", "follow"], ["Plunge down into the hole", "plungeDown"], ["Get back", "getBack"]]
                },
                // TEXT
                // {
                //     "“I knew you could do it, little redwing,” says Soaren, “after everything we’ve been through together, this was one of the greatest battles we’ve ever fought. Well done!”\nAs the crowd thanks you, you are reminded of the fact that the tall trees surrounding you are still burning. They are like tall towers, imposing themselves over you and your friends.\nAnd then, realization hits you… the trees are collapsing. \n“THE TREES!” shouts Featherfoot “THEY ARE FALLING ON US!”\nThe flock starts to panic, but in the same instant, everyone goes airborne.\n“Hurry, son!” your father shouts. \nYou follow suit.\nEvery tree in the forest is now crashing, one by one. However, your flock is led by Soaren, who is a master at maneuvering. He directs everyone to follow his movements:\n“This way!” he shouts, as you approach the exit.\nYou are following close behind everybody, and your brother and father are right in front of you. Suddenly, a colossal conifer begins to topple over everyone.\n“HURRY!” shouts the owl, “WE CAN STILL MAKE IT!”\nEverybody gets away, to the other side, but you are behind everybody, trying the best you can to get close to the group, but you are too slow. \nYOU NOW SEE THE TREE FALLING ON YOU. You can still make it across, but you also see a hole in the ground beneath you. \nYOU HAVE SIX SECONDS TO MAKE YOUR NEXT MOVE.\nYou are now presented with three options: you can either get back and fly in the opposite direction, away from the flock; you can plunge down into the hole beneath you, or you can follow the rest and cross to the other side."
                // }
             ],
             
                
                // {
                // "name": "soarenScreech",
                // "text": "The screech is so loud, that it petrifies all of the strong falcons in the forest. 'RUN FOR YOUR LIVES!' they scream to each other. They all frantically gather together into a flock, panicking, and fly away. All of the falcons are now gone."
                // },
                // {
                
                // ],
                // Text for THE FINALE:
                // Upon choosing the "getBack" option from finalActions, the user will see this text:
                "getBack": [
                    {
                        "name": "getBackAction",
                        "text": "You quickly change direction, and you fly away just in time to escape the falling tree, but many of the branches break off! You see one of them falling on you, and!--"
                    },
                    {
                        "name": "fireSilence1",
                        "text": ". . ."
                    },
                    {
                        "name": "fireSilence2",
                        "text": ". . ."
                    },
                    {
                        "name": "wakeInFire",
                        "text": "'Wake up.'"
                    },
                    {
                        "name": "openEyes",
                        "text": "You open your eyes, and your vision is blurred. You can make out, however, that you are surrounded by flames. You are coughing."
                    },
                    {
                        "name": "falconVoice",
                        "text": "'The smoke is really hitting you, huh?' says a voice. Your vision clears and you try to get a closer look at the speaker. It is a falcon."
                    },
                    {
                        "name": "outcome2",
                        "text": "'You're coming with me,” says the falcon.'"
                    },
                    {
                        "name": "faintAgain",
                        "text": "You shut your eyes again, and your strength is failing. You fall asleep, but you feel yourself being lifted from the ground. And then you feel the air. It is fresh air. But you feel a certain chill in your feathers. A chill… of winter…"
                    }
                    ],
                // Upon choosing the "plungeDown" option from finalActions, the user will see this text:
                    "plungeDown": [
                    {
                        "name": "plungeIntoHoleYes",
                        "text": "You plunge down into the hole beneath you. The tree falls with a loud thump, covering the hole. You are safe inside, but there is no light.",
                    },
                    {
                        "name": "stayInCave",
                        "text": "You call out for help, but no one hears you. After crying out for about an hour, you decide to explore the hole. It turns out to be a cave system."
                    },
                    {
                        "name": "stayInCave2",
                        "text": "After exploring for a while, you find an old owl and a crow." 
                    },
                    {
                        "name": "meetGlydeAndClancy",
                        "text": "“Greetings, little one,” says the owl, “I am Glyde, brother of Soaren. And this crow sitting in front of me is Clancy, my companion. We have been waiting for someone important to arrive.”" 
                    },
                    {
                        "name": "clancy",
                        "text": "“Yes,” says the crow, “we’ve been sitting here, in this cave, for two months now, with no sunlight, and we are quite lonesome. You look like a friendly fellow. Would you care to stay with us until our awaited traveler returns?”"
                    },
                    {
                        "name": "ending3",
                        "text": "You agree and decide to keep them company and stay with them until the traveler comes back. You don't know however, who that traveller is, and how long you will wait for him to return."
                    },
                    ],
                
                // Upon choosing the "follow" option from finalActions, the user will see this text:
                "follow": [
                    {
                        "name": "followEnding1",
                        "text": "You follow the flock and cross to the other side, just in time before the tree falls. You fly the rest of your way home, past the mountain, past the giant tree where you met the tarantula, past Soaren's watchtower. Finally, you return home, and become an instant local icon. All of the redwing families thank you for saving their children and relatives."
                    },
                    {
                        "name": "followEnding2",
                        "text": "You make many friends and spend quality time with your brother, your father, and your mother, who is forever indebted to you for saving her husband, as well as her son."
                    },
                    {
                        "name": "followEnding3",
                        "text": "In all of this, Soaren becomes your full-time mentor, who teaches you new skills, and tells you stories. You become best friends with him."
                    },
                    {
                        "name": "followEnding4",
                        "text": "You are happy to have met him, and you are glad that you and your family are safe and sound, without a single tarantula or falcon in sight. You are at peace."
                    }
                ]

            },

            updateImageBox: function (textName = "", imageName = "") {
                try {
                    // Map of game text names to image file names
                    const imageMap = {
                        // ~INTRO~
                        "introText": "forest.jpg",
                        "soarenIntroduction": "Owl.png",
                        "motherTalk": "mom.jpg",
                        "soarenAnswer": "Owl.png",

                    //---ROUTE OF ACCEPTANCE---
                        "acceptStart": "forest.jpg",
                        "soarenLine1": "Owl.png",
                        //FIRST FALCON 
                        "falconFightIntro": "FarCry.png", 
                        "soarenHelps": "Owl.png",
                        "falconEvade": "FarCry.png", 
                        
                        // TARANTULA
                        "soarenIntro": "forest.jpg",
                        "tarantulaFightIntro": "big.png",
                        "tarantulaEncounter": "small-tarantula-pixel.png",
                        "soarenRemark": "Owl.png",
                        "soarenRemarkGust": "Owl.png",

                        //STRONG FALCON
                        "mountainApproach": "mountain.webp",
                        "soarenEncouragement": "Owl.png",
                    //---ROUTE OF ACCEPTANCE---

                    //---CONTEMPLATION AND REJECTING THE CALL
                        "rejectStart": "forest.jpg",
                        "contemplationIntro": "forest.jpg",

                        "falconAmbushDuringContemplation": "FarCry.png",
                        "owlRescue": "Owl.png",
                        "silence1": "silence.avif",

                        // WATCHTOWER SCENE
                        "wakeUpScene": "watchtower.jpg.png",
                        "watchtowerEat": "seeds2.avif",
                        "watchtowerTalk": "Owl.png",

                        "peacefulFlight": "forest-night.png",
                        "soarenClarifiesLocation": "Owl.png",

                        
                        // APPROACH MOUNTAIN
                        "mountain1": "mountain.webp",
                        "soarenMountain": "Owl.png",

                        // MERGING STRONG FALCON FIGHT
                        "strongFalconBattleIntro": "Thundercloud.png",
                        "soarenProtection": "Owl.png",
                        "soarenRemark3": "Owl.png",
                        "shreikStop": "Thundercloud.png",
                        "soarenResponse5": "Owl.png",

                        // CAVE SCENE
                        "caveArrival": "cave.png",
                        "exploreCave": "book.jpg",
                        "soarenTalkCave": "Owl.png",
                        "giantTarantulaIntro": "cave.png",
                        "giantTarantulaBeforeYou": "Giant-Tarantula-pixel.png",
                        "soarenRiddle": "Owl.png",
                        "soarenStuck": "cobweb.jpg",
                        "tarantulaYourOnYourOwn": "Giant-Tarantula-pixel.png",
                        "soarenThanks": "Owl.png",
                        "youEscape": "cave.png",

                        // CLIMAX
                        "exit": "bunring.png", 
                        "dialogue": "two.png",
                        "climaxFalconTrio": "three-falcons.webp",
                        "soarenDisrespect": "Owl.png",
                        "ohNo": "two.png",
                        "falconsAreGettingTHere": "three-falcons.webp",
                        "letItOUt": "redwing.png",
                        "fear": "three-falcons.webp",
                        "screamFalcons": "fflock.png",
                        "crowdGoesWild": "crowd-goes-wild.webp",
                        "proud": "two.png",
                        "soarenWake": "Owl.png",
                        "flockRush": "escape.jpg",
                        "finalVerdict": "fallingTree.png",
                        "hit": "redwing.png",
                        "hitWithBeak": "redwing.png",

                        // GET BACK
                        "fireSilence1": "silence.avif",
                        "openEyes": "fireSilence.webp",
                        "falconVoice": "fire-falcon.png",
                        "faintAgain": "silence.avif",

                        // PLUNGE DOWN
                        "plungeIntoHoleYes": "silence.avif",
                        "stayInCave": "cave2.png",
                        "stayInCave2": "Stcuk_In_a_whole.png",
                        // FOLLOW
                        "followEnding1": "escape.jpg",
                        "followEnding2": "forest.jpg"
                    };

                    // Validate textName and imageName
                    if (!textName && !imageName) {
                        console.warn("Both textName and imageName are missing. No image will be updated.");
                        return;
                    }

                    // Allow customization: override the default image if a specific imageName is provided
                    const selectedImage = imageName || imageMap[textName];

                    // Get the imageBox element
                    const imageBox = document.getElementById("imageBox");

                    // Update the background image of the imageBox
                    if (selectedImage) {
                        imageBox.style.backgroundImage = `url('img/${selectedImage}')`;
                    } 
                } catch (error) {
                    console.error("Error in updateImageBox:", error);
                }
            },
            

            writeText: function () {
                const currentArray = this.activeText || this.gameText.introText;
                console.log("Current activeText:", this.activeText); // Debugging log
                console.log("Current textIndex:", this.textIndex); // Debugging log

                if (this.textIndex >= currentArray.length) {
                    console.log("End of text array reached.");
                    return;
                }
            
                const currentEntry = currentArray[this.textIndex];
                console.log("Displaying text for:", currentEntry.name, currentEntry.text); // Debugging log

                // *** Call updateImageBox here ***
                this.updateImageBox(currentEntry.name); // Dynamically update the image based on the current text node
            
                // Clear the dialogue box before displaying new text
                if (this.i === 0) {
                    document.getElementById("text").innerHTML = "";
                }
            
                // Hide the continue button if the current node is in nodesThatHideContinue
                const nextButton = document.getElementById("nextButton");
                if (story.nodesThatHideContinue.includes(currentEntry.name)) {
                    nextButton.style.display = "none";
                } else {
                    nextButton.style.display = "flex";
                }
            
                // Enable the ACT button if the current node is "callToAction"
                const actButton = document.getElementById("act");
                if (currentEntry && story.nodesThatHideContinue.includes(currentEntry.name)) {
                    actButton.classList.remove("disabled");
                } else {
                    actButton.classList.add("disabled");
                }
            
                // Display the text with typewriter functionality
                const fullText = currentEntry.text;
                if (this.i < fullText.length) {
                    this.isTyping = true;
                    document.getElementById('text').innerHTML += fullText.charAt(this.i);
                    this.i++;
                    this.typingTimeout = setTimeout(() => this.writeText(), this.speed);
                } else {
                    this.isTyping = false;
                    this.i = 0; // Reset character index for the next entry
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
            const currentEntry = story.activeText[story.textIndex];
            console.log("routeOfAcceptanceLogic triggered for:", currentEntry.name);
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

            function sceneSwitchAcceptance() {
            if (!combatActive && player.health > 0) {
                console.log("Combat has ended, and player is alive. Proceeding to the next scene...");

                // Save the current game state to localStorage
                const gameState = {
                    currentSceneIndex: story.currentSceneIndex,
                    activeText: story.activeText,
                    textIndex: story.textIndex,
                };
                console.log("Saving game state:", gameState); // Debugging log
                localStorage.setItem("gameState", JSON.stringify(gameState));

                // Increment the current scene index and update the active text
                if (story.sceneName && story.currentSceneIndex < story.sceneName.length - 1) {
                    story.currentSceneIndex++;
                    console.log(`Switching to the next scene in the same page: ${story.sceneName[story.currentSceneIndex]}`);
                    story.activeText = story.gameText[story.sceneName[story.currentSceneIndex]];
                    story.textIndex = 0;
                    story.i = 0;
                    story.writeText();
                } else {
                    console.log("No more scenes available. Game completed!");
                    // Handle end-of-game logic here if needed
                }
            } else if (player.health <= 0) {
                console.log("Player has fallen. Game over.");
                // Handle game over logic here if needed
            } else {
                console.log("Combat is still active. Scene switch aborted.");
            }
        }

        
            


// ok
// function forceResetCombat() {
//     combatActive = false;
//     currentEnemy = null;
//     document.getElementById("combatDisplay").style.display = "none";
//     console.log("Combat state forcibly reset.");
// }

// Helper function to execute call-to-action text nodes
// function executeCallToAction(nodeName) {
//     if (combatActive) return; // Prevent re-triggering during active combat
//     console.log("Executing call to action. combatActive:", combatActive);

//     const callToActionNode = story.gameText.routeOfAcceptance.find(node => node.name === nodeName);
//     if (callToActionNode) {
//         story.activeText = [callToActionNode];
//         story.textIndex = 0;
//         story.i = 0;

//         // Use writeText to display the text with typewriter functionality
//         document.getElementById("text").innerHTML = ""; // Clear the dialogue box
//         story.writeText();
//     }
// }


document.addEventListener('DOMContentLoaded', function () {
    // List of image paths to preload
    const imagePaths = [
        "img/forest.jpg",
        "img/Owl.png",
        "img/mom.jpg",
        "img/FarCry.png",
        "img/big.png",
        "img/small-tarantula-pixel.png",
        "img/mountain.webp",
        "img/Thundercloud.png",
        "img/watchtower.jpg.png",
        "img/seeds2.avif",
        "img/book.jpg",
        "img/cave.png",
        "img/Giant-Tarantula-pixel.png",
        "img/cobweb.jpg",
        "img/bunring.png",
        "img/three-falcons.webp",
        "img/redwing.png",
        "img/fflock.png",
        "img/crowd-goes-wild.webp",
        "img/escape.jpg",
        "img/fallingTree.png",
        "img/silence.avif",
        "img/fireSilence.webp",
        "img/fire-falcon.png",
        "img/cave2.png",
        "img/Stcuk_In_a_whole.png"
    ];

    // Preload images
    preloadImages(imagePaths);

    // Restore game state or start fresh
    const savedGameState = localStorage.getItem("gameState");
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        console.log("Restoring game state:", gameState); // Debugging log

        // Restore story state
        story.currentSceneIndex = gameState.currentSceneIndex;
        story.activeText = gameState.activeText || story.gameText.introText; // Fallback to introText if activeText is null
        story.textIndex = gameState.textIndex || 0;

        // Ensure textIndex is within bounds
        if (!story.activeText || story.textIndex >= story.activeText.length || story.textIndex < 0) {
            console.warn("textIndex is out of bounds or activeText is invalid. Resetting to 0.");
            story.textIndex = 0;
        }

        console.log("Game state restored successfully.");
        console.log("Active text:", story.activeText);
        console.log("Text index:", story.textIndex);

        // Continue writing text from the restored state
        story.writeText();
    } else {
        console.log("No saved game state found. Starting fresh.");
        story.activeText = story.gameText.introText; // Start with the intro text
        story.textIndex = 0;
        story.writeText();
    }

    // === OTHER BUTTONS ===
    document.getElementById('nextButton').addEventListener('click', function () {
        story.skipOrNext();
    });

    story.writeText();

    // === ACT BUTTON SETUP ===
    const actButton = document.getElementById("act");
    const actDisplay = document.getElementById("actDisplay");
    const actOptions = document.getElementById("actOptions");
    const closeActDisplay = document.getElementById("closeActDisplay");

    actButton.addEventListener("click", function () {
    actOptions.innerHTML = ""; // Clear previous options
    const currentArray = story.activeText || story.gameText.introText;

    // Ensure textIndex is within bounds
    if (!currentArray || story.textIndex >= currentArray.length || story.textIndex < 0) {
        console.error("textIndex is out of bounds or currentArray is invalid. Cannot access currentEntry.");
        return; // Exit the function to prevent further errors
    }

    const currentEntry = currentArray[story.textIndex];

    // Ensure currentEntry is defined before accessing its properties
    if (!currentEntry) {
        console.error("Invalid textIndex or activeText. Cannot access currentEntry.");
        return; // Exit the function to prevent further errors
    }

    let optionsToShow = [];

    if (currentEntry && currentEntry.name && story.nodesThatHideContinue.includes(currentEntry.name)) {
        optionsToShow = currentEntry.choices;
    }

    // Reusable logic to add buttons
    if (optionsToShow.length > 0) {
        optionsToShow.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice[0];
            button.classList.add("act-option");
            button.addEventListener("click", () => {
                console.log(`Player chose: ${choice[0]}; goto --> ${choice[1]}`);
                actDisplay.style.display = "none";

                // Check if the choice is "End the game"
                if (choice[1] === "gameOver") {
                    window.location.href = "game-over.html"; // Redirect to the game-over page
                    return;
                }

                if (story.gameText[choice[1]]) { // Check if the destination key exists
                    story.activeText = story.gameText[choice[1]]; // Set the active text to the new destination key
                    story.textIndex = 0; // Reset text index
                    story.i = 0; // Reset character index
                    document.getElementById('text').innerHTML = ''; // Clear previous text
                    story.writeText(); // Update the active text
                    actButton.classList.add("disabled"); // Disable the act button
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

    if (!actButton.classList.contains("disabled")) { // Only proceed if actButton is not disabled
        if (actDisplay.style.display === "block") {
            actDisplay.style.display = "none"; // Hide the act display if it is open
        } else {
            actDisplay.style.display = "block"; // Show the act display if it is hidden
        }
    }

    closeActDisplay.addEventListener("click", function () {
        actDisplay.style.display = "none";
        });
    });
});

function handleEndingRedirect() {
    const currentEntry = story.activeText[story.textIndex];

    if (!currentEntry || !currentEntry.name) {
        console.error("Invalid currentEntry or missing name property.");
        return;
    }

    // Check the currentEntry name and redirect to the appropriate ending page
    switch (currentEntry.name) {
        case "followEnding4":
            window.location.href = "followEnding.html";
            break;
        case "ending3":
            window.location.href = "plungeDownEnding.html";
            break;
        case "faintAgain":
            window.location.href = "getBackEnding.html";
            break;
        default:
            console.warn("No matching ending found for currentEntry:", currentEntry.name);
            break;
    }
}

// Attach the function to the nextButton click event
document.getElementById("nextButton").addEventListener("click", handleEndingRedirect);
    //   document.getElementById("darryl-img").addEventListener("click",()=>{})