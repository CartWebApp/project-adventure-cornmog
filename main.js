// ---------------------------------------------------------------------------------------
//   ~STORY LOGIC~
    const story = {
         startChoices: ["accept", "decline", "think about it"],
         combat: [],
         actions: [act, eat, talk, combat],
         caveActions: ["explore", "continue"],
         finalActions:["follow", "plunge down", "get back"],
            PlayerDeath: function(){
                if (Player.health == 0){
                    console.log("You have fallen..."); 
                }
            }
    };
    
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
            EnemyDeath(){
                if (this.health <= 0){ 
                    // ENEMY SHOULD DIE
                }
        }
        attack() {
            const randomMove = this.enemyMoves[Math.floor(Math.random() * this.enemyMoves.length)];
    
            // Check if the move is a special one like "thunderbolt"
            if (randomMove.name === "thunderbolt" && this.enemyName !== "Strong Falcon") {
                console.log(`${this.enemyName} cannot use thunderbolt!`);
                return; // Prevent "thunderbolt" unless it's the specific enemy
            }
    
            // If dodge is active, avoid attack
            if (this.dodgeTurnsRemaining > 0) {
                console.log(`${this.enemyName} is dodging attacks for ${this.dodgeTurnsRemaining} more turns!`);
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
