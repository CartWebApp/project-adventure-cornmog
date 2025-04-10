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
        
            gameText: {
                introText: [
                    {
                        name: "introText1",
                        text: 'Your name is Red. You are a redwing bird who lives in a forest full of other redwing families. Your father and brother go on a quest with a flock of scout birds to find a safe place to migrate.'
                    },
                    {
                        name: "introText2",
                        text: "The squadron does not return for two months. Your mother is worried about your father and brother. Rumors spread throughout the forest about the missing redwings."
                    },
                    {
                        name: "introText3",
                        text: "One day, an owl arrives. He flies down to your nest and greets you and your mother. The owl then tells you that he knows where your father and brother are and calls you to go with him and find them."
                    }
                ]
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
