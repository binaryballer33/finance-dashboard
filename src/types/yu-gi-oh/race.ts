import z from "zod"

const RACE_YUGIOH_CARD = [
    "Normal",
    "Continuous",
    "Field",
    "Equip",
    "Quick-Play",
    "Ritual",
    "Counter",
    "Aqua",
    "Beast",
    "Beast-Warrior",
    "Cyberse",
    "Dinosaur",
    "Divine-Beast",
    "Dragon",
    "Fairy",
    "Fiend",
    "Fish",
    "Insect",
    "Machine",
    "Plant",
    "Psychic",
    "Pyro",
    "Reptile",
    "Rock",
    "Sea Serpent",
    "Spellcaster",
    "Thunder",
    "Warrior",
    "Winged Beast",
    "Wyrm",
    "Zombie",
] as const

const RACE_MONSTER_CARD = [
    "Aqua",
    "Beast",
    "Beast-Warrior",
    "Cyberse",
    "Dinosaur",
    "Divine-Beast",
    "Dragon",
    "Fairy",
    "Fiend",
    "Fish",
    "Insect",
    "Machine",
    "Plant",
    "Psychic",
    "Pyro",
    "Reptile",
    "Rock",
    "Sea Serpent",
    "Spellcaster",
    "Thunder",
    "Warrior",
    "Winged Beast",
    "Wyrm",
    "Zombie",
] as const

const RACE_SPELL_OR_TRAP_CARD = ["Normal", "Continuous", "Field", "Equip", "Quick-Play", "Ritual", "Counter"] as const

export const RaceSpellOrTrapCardSchema = z.enum(RACE_SPELL_OR_TRAP_CARD, { message: "Invalid Race" })
export const RaceMonsterCardSchema = z.enum(RACE_MONSTER_CARD, { message: "Invalid Race" })
export const RaceYuGiOhCardSchema = z.enum(RACE_YUGIOH_CARD, { message: "Invalid Race For" })
