---
title: "Game Design: About Skilltrees"
tags: en
date: 2025-09-07
---

There are two types of skill trees. Pure and mixed skill trees.

Ability trees grant the player an ability up learning (Dota2, Diablo, Titan Quest, ...). Pure skill trees don't grant abilities, but instead offer a wholistic improvements to the player attributes (Path of Exile, Astroloot, ...). 

A basic skill tree can be described as such:

1. Root node
2..n Stem
3a. branch 
3b. leaves ("Notables")

Taking the example of PoE, the root node is defined by the character class the player chooses. The stem contains small attribute improvements. The leaves are defined by notable skills, often drastically changing the character build direction. The branch towards the stem usually also grants benefits towards the leaf.

Example

1. Witch class root node
2..n Intelligence
3a. Improved curse damage
3b. Cursed enemies explode on dead, spreading their curse to adjacent enemies. 

Skilltrees offer players direction, specialization, build variety and --in the best case-- unlimited replayability. In that sense, skilltrees are a meta-game on top of the core gameplay loop. If the skilltree is interesting, players are drawn to come back to the game.

There has been a lot of variance in skilltrees, both in visuals as well as mechanics.

Skyrim shows the skilltrees as star image, PoE as connected tree that allows to branch out to skills from all classes, no matter the starting root node. 

## Going beyond -- Skilltrees as game design

In this post, I want to share some game design ideas of mine -- using the skill tree as part of the core game loop.

### Slot Knight

What if attributes are a currency? What if attributes could be gambled?

PoE already does this in some form, with crafting material serving as currency, and even granting tree respec points.

However, what if attributes (strength, Intelligence, ..) could be earned, sold, gambled? Fight a boss, wager some attributes, skills, ... and go big or go home? Win it all back twice, improve your skills, unlock new things, or lose it all and need to grind it again? What if level ups offer a slot machine to draw benefits from? What if equipment needs to be bought with attributes?

The big problem I see is the swinginess of the game. Either this gets unbalanced quick (Quadrupling your strength in a few maps), or it gets neutered to be unfun.

It would also be difficult to achieve with a ARPG style of long-term gameplay, and instead be a better fit for action rougelikes and the like.

### Chaos boxes

Here, we start with a root node in a field of squares. Every chosen node (at the beginning only the root node) allows only to see the direct neighbours, top, bot, left and right. So, it may be strength above, Intelligence below, ability to the left and charisma to the right. Choosing one of these unlocks the next set of neighbours.

This allows a lot of direction for game design. 

Simple: all strenght/melee/brute-force at the top, all Intelligence/wizardry/spells to the bottom, all agility/range/evasion to the left, ...

Advacend meanings -- the top is order and clarity, granting targeted unlocks. The bottom is chaos, granting random benefits. The left is combo, possibly unlocking multiple boxes at the same time. The right side is the unknown, granting randomized rewards.

This could even be expanded by choosing nodes that randomize the skill tree or change its nature. Heck, why not add corruption on top? Or maybe lock/shuffle all the unchosen nodes? Or negative nodes that need to be navigated around, or maybe these negative block the path to the leaf nodes? Maybe every node comes with a drawback? Or maybe all neighbours need to be chosen at the same time, causing the player to consider the drawbacks between positive and negative nodes. Or we add some Minesweeper (or Hexcells) type combos.

Furthermore, some type of node reveal or teleportation could be possible, like in Talented. 

Also, we are not limited to squares. Hexagons are popular, and we may even block some of their corners to stay unconnected. Similarly, we could add paths inside the hexagons, so that matching edges need to connect.






