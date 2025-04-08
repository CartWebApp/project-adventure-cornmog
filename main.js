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

            writeText:function(){
                var i = 0;
                var txt = 'Your name is Red. You are a redwing bird who lives in a forest full of other redwing families. Your father and brother go on a quest with a flock of scout birds to find a safe place to migrate.';
                var speed = 50;
                if (i < txt.length) {
                    document.getElementById('text').innerHTML += txt.charAt(i);
                    i++;
                    setTimeout(write, speed);
                  }
            }
            // switchScene: function(){
                
            // }
            // switchText: function(){

            // }
            // document.getElementById('dialogueBox').addEventListener('click', switchText);

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
