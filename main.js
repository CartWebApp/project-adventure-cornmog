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

//   General Enemy Class      
      class Enemy{
        constructor(enemyName, health, enemyMoves){
            this.enemyName = enemyName;
            this.health = health;
            this.enemyCombat;
            this.enemyMoves = enemyCombat[enemyMoves];
            function EnemyDeath(){
                if (this.health == 0){ 
                    // ENEMY SHOULD DIE
                }
            }
        }
      }

// ---------------------------------------------------------------------------------------
//   ~FALCON~  
      const falcon = new Enemy();
