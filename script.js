// ---------------------------------------------------------------------------------------
//   ~STORY LOGIC~
    const story = {
         startChoices: ["accept", "decline", "think about it"], 
         combat: [],
         actions: [act, eat, talk, combat],
         caveActions: ["explore", "continue"],
         finalActions:["follow", "plunge down", "get back"],
            playerDeath: function(){
                if (Player.health == 0){
                    console.log("You have fallen..."); 
                }
            },

            i: 0, // typewriter index
            textIndex: 0, // which paragraph to show
            speed: 30,
            isTyping: false, // prevent skipping while typing
            
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
                      "text": "What is your next move?"
                    }
                  ],
                //   If the player chooses "ACCEPT" in startChoices, then this text will apply
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
                //   If the player chooses "DECLINE" in startChoices, then this text will apply:
                "rejectingTheCall": [
                    {
                    "name": "rejectStart",
                    "text": "If you decline the owl’s request to go with him, he flies away, but not before giving you directions on where you can find him if you change your mind. In two days, you decide to follow the owl."
                    },
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
                //   If the player chooses "THINK ABOUT IT" in startChoices, then this text will apply:
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
                // Text for The Cave Scene:
                    "theCaveScene": [
                    {
                    "name": "caveArrival",
                    "text": "You finally reach the mountain overlooking your destination. You fly into a cave that goes through the mountain."
                    },
                    {
                    "name": "newActions",
                    "text": "You are now presented with two new actions, separate from the regular ones: 'Explore the cave' and 'Continue.'"
                    },
                    {
                    "name": "exploreCave",
                    "text": "Upon selecting the 'Explore the cave' option, you look around. You find a chest with a bundle of seeds (an item which is now stored in your inventory) and a book (also added to inventory). The book allows you to use 'flight,' which can only be used once the player reaches a certain xp threshold."
                    },
                    {
                    "name": "continueCave",
                    "text": "Upon selecting the 'Continue' option, you move through the cave and skip to the next scene."
                    }
                ]
                // Text for Giant Tarantula Bossfight:
                // Text for The Climax
                // Text for THE FINALE
            },

            
        
            writeText: function () {
                if (this.textIndex >= this.gameText.introText.length) return; // nothing left to display
        
                const fullText = this.gameText.introText[this.textIndex].text;
        
                if (this.i < fullText.length) {
                    this.isTyping = true;
                    document.getElementById('text').innerHTML += fullText.charAt(this.i);
                    this.i++;
                    setTimeout(() => this.writeText(), this.speed);
                } else {
                    this.isTyping = false; // finished typing
                }
            },
        
            nextText: function () {
                if (this.isTyping) return; // wait until current text finishes typing
        
                this.textIndex++;
                this.i = 0;
        
                if (this.textIndex < this.gameText.introText.length) {
                    document.getElementById('text').innerHTML = '';
                    this.writeText();
                } else {
                    document.getElementById('text').innerHTML = "The end of the intro!";
                    // Optionally hide the button or start the next scene
                }
            }
        };
        
        document.addEventListener('DOMContentLoaded', function () {
            document.getElementById('nextButton').addEventListener('click', function () {
                if (story.isTyping) return; // prevent skipping
                story.nextText();
            });
        
            // Start with the first text
            story.writeText();
        });
        document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('nextButton').addEventListener('click', function() {
                // Optional: reset each time button is clicked
                story.i = 0;
                document.getElementById('text').innerHTML = '';
                story.writeText();
            });
        });
    
// ---------------------------------------------------------------------------------------
//   ~PLAYER LOGIC~
  
    class Player{
        constructor(){
            this.health = 10; 
            this.health = 0; 
            this.exp = 0; 
            this.inventory = []; 
            this.canUseVenom = false;
            this.canUseFlight = false;
        }
       }

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
      const falcon = new Enemy("Falcon", 10, falconMoves);
