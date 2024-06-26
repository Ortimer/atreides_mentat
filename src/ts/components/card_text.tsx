import * as React from "react";

const BattlePlan = <p>Play as part of your Battle Plan.</p>;
const BattlePlanInstead = <p>Play as part of your battle plan in place of a weapon or defense.</p>;
const WinnerKeeps = <p>You may keep this card if you win this battle.</p>;
const DiscardAfterUse = <p>Discard after use.</p>;
const Special = <p className="heading">Special</p>;

export const card_subheading = {
  Useless: <p className="heading">Useless</p>,
  Unknown: null,
  Projectile: <p className="heading">Projectile</p>,
  Poison: <p className="heading">Poison</p>,
  Lasgun: <p className="heading">Unique Weapon</p>,
  Snooper: <p className="heading">Poison defense</p>,
  Shield: <p className="heading">Projectile defense</p>,
  Special: Special,
  "Artillery Strike": <p className="heading">Unique Weapon</p>,
  "Poison Tooth": <p className="heading">Unique Poison Weapon</p>,
  "Weirding Way": <p className="heading">Unique Projectile Weapon/Defense</p>,
  "Chemistry": <p className="heading">Unique Poison Weapon/Defense</p>,
  "Poison Blade": <p className="heading">Projectile & Poison</p>,
  "Shield Snooper": <p className="heading">Projectile & Poison</p>,
  Richese: <p className="heading">Richese technology</p>
} as const;

const card_text = {
  Useless: (
    <>
      <p>Play as part of your Battle Plan, in place of a weapon, defense, or both.</p>
      <p>
        This card has no value in play, and you can discard it only by playing it in your Battle
        Plan.
      </p>
    </>
  ),
  Unknown: (
    <p>Your mentat has been unable to predict what treachery your opponent has in store for you.</p>
  ),
  Projectile: (
    <>
      {BattlePlan}
      <p>
        Kills opponent's leader before battle is resolved. Opponent may protect leader with a
        Shield.
      </p>
      {WinnerKeeps}
    </>
  ),
  Poison: (
    <>
      {BattlePlan}
      <p>
        Kills opponent's leader before battle is resolved. Opponent may protect leader with a
        Snooper.
      </p>
      {WinnerKeeps}
    </>
  ),
  Lasgun: (
    <>
      {BattlePlan}
      <p>Automatically kills opponent's leader regardless of defense card used.</p>
      {WinnerKeeps}
      <p>
        If anyone plays a Shield in this battle, all forces, leaders, and spice in this battle's
        terroritory are lost to the Tleilaxu Tanks and Spice Bank. Both players lose this battle, no
        spice is paid for leaders, and all cards played are discarded.
      </p>
    </>
  ),
  Snooper: (
    <>
      {BattlePlan}
      <p>Protects your leader from a poison weapon in this battle.</p>
      {WinnerKeeps}
    </>
  ),
  Shield: (
    <>
      {BattlePlan}
      <p>Protects your leader from a projectile weapon in this battle.</p>
      {WinnerKeeps}
    </>
  ),
  "Family Atomics": (
    <>
      <p>
        After the first game turn, play after the storm movement is calculated, but before the storm
        is moved, <b>but only</b> if you have one more forces on the Shield Wall or a territory
        adjacent to the Shield Wall with no storm between your sector and the Wall.
      </p>
      <p>
        <b>All</b> forces on the Shield Wall are destroyed.
      </p>
      <p>
        Place the Destroyed Shield Wall token on the Shield Wall as a reminder. The Imperial Basin,
        Arrakeen and Carthag are no longer protected from the Storm for the rest of the game.
      </p>
    </>
  ),
  "Weather Control": (
    <>
      <p>
        After the first game turn, play during the Storm Phase, before the Storm Marker is moved.
      </p>
      <p>
        When you play this card, <b>you</b> control the storm this phase and may move it from 0 to
        10 sectors in a <i>counterclockwise</i> direction.
      </p>
    </>
  ),
  Hajr: (
    <>
      <p>Play during Movement Phase.</p>
      <p>Make an extra on-planet force movement subject to normal movement rules.</p>
      <p>The forces you move may be a group you've already moved this phase or another group.</p>
    </>
  ),
  "Cheap Hero": (
    <>
      <p>Play as a leader with zero strength on your Battle Plan and discard after the battle.</p>
      <p>
        You may also play a weapon and a defense. The cheap hero may be played in place of a leader
        or when you have no leaders available.
      </p>
    </>
  ),
  Karama: (
    <>
      <p>
        After factions complete their "At Start" actions and after game set-up, use this card to
        stop a player from using one of their faction advantages when they attempt to use it. Stops
        the use of that advantage during one game phase.
      </p>
      <p>Or, this card may be used to do either of these things when appropriate:</p>
      <ul>
        <li>
          Purchase a shipment of forces onto the planet at Guild rates (1/2 normal) paid to the
          Spice Bank, or
        </li>
        <li>Purchase a Treachery Card without paying spice for it</li>
      </ul>
      <p>Cannot be used to stop a win condition advantage. Discard after use.</p>
    </>
  ),
  "Tleilaxu Ghola": (
    <>
      <p>Play at any time to gain an extra revival.</p>
      <p>
        You may immediately revive 1 of your leaders regardless of how many leaders you have in the
        tanks or up to 5 of your forces from the Tleilaxu Tanks to your reserves at no cost in
        spice.
      </p>
      <p>You still get your normal revivals.</p>
    </>
  ),
  Truthtrance: (
    <>
      <p>
        Publicly ask one other player a single yes/no question about the game that must be answered
        publicly. The game pauses until an answer is given.
      </p>
      <p>The player must answer "yes" or "no" truthfully.</p>
    </>
  ),
  "Artillery Strike": (
    <>
      {BattlePlan}
      <p>Kills both leaders (no spice is paid for them).</p>
      <p>Both players may use Shields to protect their leader against the Artillery Strike.</p>
      <p>Surviving (shielded) leaders do not count towards the battle total; the side that dialed higher wins the
        battle.</p>
      {DiscardAfterUse}
    </>
  ),
  "Poison Tooth": (
    <>
      {BattlePlan}
      <p>Kills both leaders, and is not stopped by a Snooper</p>
      <p>After seeing the battle results, you may choose not to use this weapon.</p>
      {DiscardAfterUse}
    </>
  ),
  "Weirding Way": (
    <>
      {BattlePlan}
      <p>Counts as a projectile weapon, unless played with another weapon. In that case, it counts as a projectile
        defense.</p>
      {WinnerKeeps}
    </>
  ),
  "Chemistry": (
    <>
      {BattlePlan}
      <p>Counts as a poison defense, unless played with another defense. In that case, it counts as a poison weapon.</p>
      {WinnerKeeps}
    </>
  ),
  "Poison Blade": (
    <>
      {BattlePlan}
      <p>This weapon counts as both projectile and poison.</p>
      {WinnerKeeps}
    </>
  ),
  "Shield Snooper": (
    <>
      {BattlePlan}
      <p>Counts as both a Shield (projectile defense) and Snooper (poison defense).</p>
      {WinnerKeeps}
    </>
  ),
  "Amal": (
    <>
      <p>
        At the beginning of any phase, cause all players to discard half of the spice behind their shields, rounded up,
        to the Spice Bank.
      </p>
    </>
  ),
  "Thumper": (
    <>
      <p>
        Play at beginning of Spice Blow Phase instead of revealing the next Spice Blow card. Causes a Sandworm to
        appear.
      </p>
      <p>
        Play proceeds as though Shai-Hulud has been revealed.
      </p>
    </>
  ),
  "Harvester": (
    <>
      <p>
        Play just after a spice blow comes up.
      </p>
      <p>
        Doubles the spice blow. Place double the amount of spice in the territory.
      </p>
    </>
  ),
  "Harass & Withdraw": (
    <>
      {BattlePlanInstead}
      <p>
        Return undialed forces to your reserves, leader may still be killed.
      </p>
      <p>
        Cancelled if traitor is called.
      </p>
      {DiscardAfterUse}
    </>
  ),
  "Recruits": (
    <>
      <p>
        Play during revival.
      </p>
      <p>
        Double all factions free revival rates, revival limit is increased to 7.
      </p>
      {DiscardAfterUse}
    </>
  ),
  "Reinforcements": (
    <>
      {BattlePlanInstead}
      <p>
        +2 to dialed number, then send 3 forces from your reserves to the tanks.
      </p>
      <p>
        You must have at least 3 forces in the reserve to use this card.
      </p>
      {DiscardAfterUse}
    </>
  ),
  "Juice of Sappho": (
    <>
      <p>Choose one:</p>
      <p>Play this card to the considered the aggresor in a battle, or</p>
      <p>Go first for any phase or action that require turn order, or</p>
      <p>Go last for any phase or action that require turn order</p>
      {DiscardAfterUse}
    </>
  ),
  "Distrans": (
    <>
      <p>Give another player a Treachery Card from your hand (If that player hand it's not full)</p>
      <p>Play at any time (Other than during a bid).</p>
      {DiscardAfterUse}
    </>
  ),
  "Nullentropy Box": (
    <>
      <p>At any time, pay 2 spice to the bank, then get any card from the discard.</p>
      {DiscardAfterUse}
    </>
  ),
  "Ornithopter": (
    <>
      <p>Play to move one of your groups 3 spaces or to move 2 different groups normally</p>
      {DiscardAfterUse}
    </>
  ),
  "Residual Poison": (
    <>
      <p>Play on an opponent before choosing leaders in battle, kill one random leader.</p>
      {DiscardAfterUse}
    </>
  ),
  "Semuta Drug": (
    <>
      <p>Get another treachery before it gets discarded and add it to your hand.</p>
      {DiscardAfterUse}
    </>
  ),
  "Portable Snooper": (
    <>
      <p>Defense - Poison</p>
      <p>Protects against Poison, may be played after revealing battle plan.</p>
      {DiscardAfterUse}
    </>
  ),
  "Stone Burner": (
    <>
      <p>Weapon - Special</p>
      <p>You choose after battle plans are revealed:</p>
      <p>Both leaders are killed, OR leaders don't add to strength to this battle.</p>
      <p>In either case, the player with the higher number of undialed force tokens wins.</p>
      {DiscardAfterUse}
    </>
  ),
  "Mirror Weapon": (
    <>
      <p>Weapon - Special</p>
      {BattlePlan}
      <p>Copies opponents weapon</p>
      {DiscardAfterUse}
    </>
  )
} as const;

export default card_text;
