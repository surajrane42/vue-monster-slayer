new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },

    attack: function () {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster making damage of " + damage
      });
      if (this.checkGameEnd()) {
        return;
      }
      this.monsterAttack();
    },

    specialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster hard making damage of " + damage
      });
      if (this.checkGameEnd()) {
        return;
      }
      this.monsterAttack();
    },

    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
        this.turns.unshift({
          isPlayer: true,
          text: "Player heals by " + 10
        });
      } else {
        this.playerHealth = 100;
        this.turns.unshift({
          isPlayer: true,
          text: "Player heals to full health "
        });
      }
      this.monsterAttack();
    },

    giveUp: function () {
      this.gameIsRunning = false;
    },

    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    monsterAttack: function () {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits player making damage of " + damage
      });
      this.checkGameEnd();
    },

    checkGameEnd: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You Won!!! Do you want to Start a New game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("Sorry You Lost!!! Do you want to Start a New game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else {
        return false;
      }
    }
  }
});
