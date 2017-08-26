// https://github.com/RobertSkalko/LOOT-RPG-v1.0/blob/master/js/index.js

// linear interpolation:
let lerp = (start, finish, time) => { return start + (finish - start) * time; };
//example2:
var x = 0.5;
var z = (min + max) x;

// ------------

function save(state) {
  var data = {
    player: state.player,
    inventory: state.inventory,
    boss: state.boss
  };
  localStorage.setItem('gameState', JSON.stringify(data));
}

function load() {
  var data = localStorage.getItem('gameState');
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn(e);
    return null;
  }
}

function firebolt() {
  playerDamage = Math.floor(Damage/2 + FireDmg + MagicPow/2);

  function resetFirebolt () {
    fireboltCooldown = false;
    $('#firebolt').removeClass('onCooldown');

    if(fireboltCooldown === false && currentPlayerMana > fireboltMana){
      fireboltCooldown = true;
      $('#firebolt').addClass('onCooldown');
      critical('firebolt');
      setTimeout(resetFirebolt, 5000);
    }
  }
}

// items with all stats on class, but composition on it.

icebolt: {
  nametitle: "Icebolt",
  namefunction: "icebolt",
  nameid: "#icebolt",
  damage: Math.floor(Damage/2 + IceDmg + MagicPow/2),
  manacost: boss.level*15,
  healthcost: 0,
  manarestore: 0,
  healthrestore: 0,
  repeat: 0,
  delay: 0,
  buffname: 0,
  buffamount: 0,
  cooldown: 5000,
  spellfunction: function(){}
}
