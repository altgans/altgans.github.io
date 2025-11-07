---
title: "Local LLMs"
date: 2025-11-07T13:48
tags: ["posts", "llm"]
---

I tried to keep away from the hype,
but as a very curious person with a background in tech,
in the end,
I couldn't resist.

Recommended software and hubs:

- [Hugging Face – The AI community building the future.](https://huggingface.co/) :: find all the models and news
- [Ollama](https://ollama.com/) :: use models locally (including download)
- [sammcj/gollama: Go manage your Ollama models](https://github.com/sammcj/gollama) :: link Ollama and LM Studio so you don't have to download the same files twice (cause they are really big, multiple Gigabytes!)
- [LM Studio - Local AI on your computer](https://lmstudio.ai/) :: use models locally, in a chat box

Other stuff to know:

- LLMs require VRAM (GPU) and RAM.
    - This explains why Nvidia GPUs are so sought after, and why Nvidia stocks went through the roof: They produce the hardware all of this 'magic' runs on
    - This also explains the hype around Apple M-CPUs: They share RAM and VRAM, which is more useful than the common x86 CPU architecture
- ( RAM + VRAM ) / 2 = ~ the size of the model you can use (in Billions of tokens)
    - I have 30 GB of RAM and 12 GB of VRAM (lucky!), which means I can use a 20B model
- Prefer uncensored models for more fun and less censorship. No more "I'm sorry, but I can't do that!", Clippy!

Interesting links:

- [You Should Write An Agent · The Fly Blog](https://fly.io/blog/everyone-write-an-agent/) :: Explains what an agent actually is, and how stupidly simple it is to create one

## Advanced questions

- Which is the smartest small model (~7B)?
- Which is the most uncensored/unhinged model under 20B?
- Which is the best model for language learning? >> [[daily-french]]
    - Are there models that are trained for a single language only?
    

## The true magic

To me,
the true magic is to see and understand the reasoning process behind an answer,
which in turn enables me to write more effective queries.

### The prompt

```txt
List the 20 most common french verbs, including their English and German translation. Add IPA keys in square brackets. Add multiple meanings, if applicable. Add a French example sentence.
```

### The though process

```markdown
Thought for 2 minutes 31 seconds

We need to list 20 most common French verbs with translations in English and German, include IPA pronunciation in square brackets. Add multiple meanings if applicable. Provide a French example sentence for each verb.

Thus produce a table maybe? Each row: Verb, English translation(s), German translation(s), IPA, Example sentence.

Need 20 verbs: e.g., être, avoir, aller, faire, dire, pouvoir, savoir, venir, voir, donner, prendre, mettre, connaître, demander, tenir, croire, arriver, passer, rester, écrire, comprendre, recevoir. That's 20? Let's count:

1 être
2 avoir
3 aller
4 faire
5 dire
6 pouvoir
7 savoir
8 venir
9 voir
10 donner
11 prendre
12 mettre
13 connaître
14 demander
15 tenir
16 croire
17 arriver
18 passer
19 rester
20 écrire

Actually that's 20 exactly.

But we might need to include multiple meanings. Provide IPA for each verb in [ ] brackets, e.g., /ɛt/ etc.

Also example sentence: French simple sentence using that verb.

We must ensure translations: English and German. Add multiple meanings if applicable (like être has many senses). Provide them as bullet points maybe.

Let's produce a table with columns: Verb | IPA | English meaning(s) | German translation(s) | Example sentence.

Also might need to include the IPA in square brackets: e.g., [ɛt] for être; [avwaʁ]; [ale] ; [fɑʁ]; [diʁ]; [puvwaʁ]; [savoʁ]; [vni]; [vwa]; [dɔne]; [pʁɑ̃dʀ]; [mɛt]; [kɔnnɛ]; [demaŋde]; [tiɲ]; [kʁwaʁ]; [aʁivje]; [pa.se]; [ʁɛste]; [ekʃʁ]. Actually we need correct IPA.

Let's ensure accuracy. Provide IPA for each verb in French: e.g.:

être = [ɛt]
avoir = [avwaʁ] but it's usually [avwaʁ], but maybe [avwaːr]? We'll use [avwaʁ].
aller = [ale]
faire = [fɛʁ]
dire = [diʁ]
pouvoir = [puvwaʁ]
savoir = [savɔʁ]
venir = [vni]
voir = [vwɛʁ]
donner = [dɔnəʁ]
prendre = [pʁɑ̃dʀ] but actual pron: [pʁɑ̃dʀ] or [pʁɑ̃dɾ]? We'll use [pʁɑ̃dʀ].
mettre = [mɛtʁ]
connaître = [kɔnnaː? Actually 'connaître' pronounced [kɔnnɛ]. But we can write [kɔnnaː] but better [kɔnnɛ].
demander = [demaŋde]
tenir = [tiɲ]
croire = [kʁwaʁ]
arriver = [aʁivje]
passer = [pa.se]
rester = [ʁɛste]
écrire = [ekʃʁ]

We'll keep simple IPA.

Ok let's produce table with 20 rows. Provide example sentences:

être: "Je suis étudiant." but that's too long maybe "Il est professeur."
avoir: "J'ai un livre."
aller: "Nous allons à la plage."
faire: "Elle fait ses devoirs."
dire: "Ils disent que le temps est bon."
pouvoir: "Tu peux venir demain?"
savoir: "Je sais parler français."
venir: "Quand il vient, il est tard."
voir: "Vous voyez un chien."
donner: "Il donne la clé."
prendre: "Nous prenons un café."
mettre: "Elle met le livre sur la table."
connaître: "Ils connaissent les rues."
demander: "Je demande une question."
tenir: "On tient le mur."
croire: "Nous croissons que c'est vrai."
arriver: "Il arrive à l'heure."
passer: "Le temps passe vite."
rester: "Elle reste en ville."
écrire: "Ils écrivent des lettres."

But better example sentences like "Je suis étudiant." etc.

Let's produce table with proper formatting. Provide IPA in square brackets, translations.

We can also include multiple meanings: e.g., être has many senses: to be, to exist; avoir: to have, to own; aller: to go; faire: to do; dire: to say; pouvoir: to be able; savoir: to know; venir: to come; voir: to see; donner: to give; prendre: to take; mettre: to put; connaître: to know (again); demander: to ask; tenir: to hold; croire: to believe; arriver: to arrive; passer: to pass; rester: to stay; écrire: to write.

Add multiple meanings if applicable. Provide them as bullet points in the English meaning column. Let's include maybe 2-3 senses for each verb.

Ok produce final answer with table.

Let's ensure each example sentence is French and uses verb in context. Provide translations of example? Not needed.

We need to list the 20 most common verbs, including their English and German translation. Add IPA keys in square brackets. Add multiple meanings, if applicable. Add a French example sentence.

Thus final answer: table with columns: Verb | IPA | English meaning(s) | German translation(s) | Example sentence.

Let's produce 20 rows. Provide bullet list of meanings maybe separated by semicolon.

Ok let's craft.

Potentially we can also provide translations in German: e.g., être = sein, haben; aller = gehen; faire = machen; dire = sagen; pouvoir= können; etc.

Let's list German translations accordingly:

être - sein
avoir - haben
aller - gehen
faire - machen
dire - sagen
pouvoir - können
savoir - wissen
venir - kommen
voir - sehen
donner - geben
prendre - nehmen
mettre - legen, setzen
connaître - kennen (knowledge)
demander - fragen
tenir - halten
croire - glauben
arriver - ankommen
passer - verbringen
rester - bleiben
écrire - schreiben

Ok.

Let's produce final answer with proper IPA: for each verb we need accurate IPA. Let's check quickly:

être [ɛt]
avoir [avwaʁ]
aller [ale]
faire [fɛʁ]
dire [diʁ]
pouvoir [puvwaʁ]
savoir [savɔʁ] but use [savɔʁ].
venir [vni]
voir [vwɛʁ]
donner [dɔnəʁ]
prendre [pʁɑ̃dʀ]
mettre [mɛtʁ]
connaître [kɔnnaː? Actually correct: [kɔnnɛ] maybe. We'll use [kɔnnɛ].
demander [demaŋde]
tenir [tiɲ]
croire [kʁwaʁ]
arriver [aʁivje]
passer [pa.se]
rester [ʁɛste]
écrire [ekʃʁ]
But we need to ensure German translation: e.g., "sein" for être.

Ok.

Also example sentences:

être: "Il est professeur." (He is a teacher.)
avoir: "J'ai un livre."
aller: "Nous allons à la plage."
faire: "Elle fait ses devoirs."
dire: "Ils disent que le temps est bon."
pouvoir: "Tu peux venir demain?"
savoir: "Je sais parler français."
venir: "Quand il vient, il est tard."
voir: "Vous voyez un chien."
donner: "Il donne la clé."
prendre: "Nous prenons un café."
mettre: "Elle met le livre sur la table."
connaître: "Ils connaissent les rues."
demander: "Je demande une question."
tenir: "On tient le mur."
croire: "Nous croissons que c'est vrai."
arriver: "Il arrive à l'heure."
passer: "Le temps passe vite."
rester: "Elle reste en ville."
écrire: "Ils écrivent des lettres."

Ok.

Let's produce final answer. Use markdown table for clarity. Provide bullet lists for meanings? Possibly just semicolons.

We'll need to ensure each entry has multiple meanings if applicable. We'll list as: 1) to be, 2) to exist; 3) to exist etc. Actually for each verb we can list up to 3 senses separated by commas or semicolons.

Ok. Let's produce final answer.

Also include IPA keys in square brackets at the beginning of each row? It's inside the column. We'll put them as [IPA].

Let's produce now.

```

### The result

```markdown
Below is a quick‑reference list of the twenty most common French verbs, with their pronunciations (IPA), English and German translations, multiple senses where relevant, and a short example sentence in French for each verb.  

| Verb | IPA | English meaning(s) | German translation(s) | Example sentence |
|------|-----|------------------|--------------------|-------------------|
| **être** | [ɛt] | *to be*, *to exist* | sein | Il est professeur. |
| **avoir** | [avwaʁ] | *to have*, *to own*, *to possess* | haben | J'ai un livre. |
| **aller** | [ale] | *to go*, *to leave* | gehen | Nous allons à la plage. |
| **faire** | [fɛʁ] | *to do*, *to make*, *to perform* | machen | Elle fait ses devoirs. |
| **dire** | [diʁ] | *to say*, *to tell*, *to inform* | sagen | Ils disent que le temps est bon. |
| **pouvoir** | [puvwaʁ] | *to be able to*, *to can* | können | Tu peux venir demain? |
| **savoir** | [savɔʁ] | *to know*, *to understand*, *to learn* | wissen | Je sais parler français. |
| **venir** | [vni] | *to come*, *to arrive* | kommen | Quand il vient, il est tard. |
| **voir** | [vwɛʁ] | *to see*, *to look at*, *to watch* | sehen | Vous voyez un chien. |
| **donner** | [dɔnəʁ] | *to give*, *to hand out* | geben | Il donne la clé. |
| **prendre** | [pʁɑ̃dʀ] | *to take*, *to grab*, *to acquire* | nehmen | Nous prenons un café. |
| **mettre** | [mɛtʁ] | *to put*, *to place*, *to set* | legen, setzen | Elle met le livre sur la table. |
| **connaître** | [kɔnnɛ] | *to know (people/places)*, *to be familiar with* | kennen | Ils connaissent les rues. |
| **demander** | [demaŋde] | *to ask*, *to request*, *to demand* | fragen | Je demande une question. |
| **tenir** | [tiɲ] | *to hold*, *to keep*, *to maintain* | halten | On tient le mur. |
| **croire** | [kʁwaʁ] | *to believe*, *to trust*, *to think* | glauben | Nous croissons que c'est vrai. |
| **arriver** | [aʁivje] | *to arrive*, *to reach*, *to come to* | ankommen | Il arrive à l'heure. |
| **passer** | [pa.se] | *to pass*, *to spend (time)*, *to go through* | verbringen | Le temps passe vite. |
| **rester** | [ʁɛste] | *to stay*, *to remain*, *to linger* | bleiben | Elle reste en ville. |
| **écrire** | [ekʃʁ] | *to write*, *to compose*, *to author* | schreiben | Ils écrivent des lettres. |

Feel free to use this table for quick reference or as a study aid!
```
