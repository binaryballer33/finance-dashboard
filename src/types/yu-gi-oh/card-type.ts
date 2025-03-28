import z from "zod"

const TYPES_YUGIOH_CARD = [
    "Spell Card",
    "Trap Card",
    "Normal Monster",
    "Gemini Monster",
    "Effect Monster",
    "Flip Effect Monster",
    "Union Effect Monster",
    "Normal Tuner Monster",
    "Tuner Monster",
    "Ritual Monster",
    "Fusion Monster",
    "Synchro Monster",
    "Synchro Tuner Monster",
    "XYZ Monster",
    "Link Monster",
    "Spirit Monster",
    "Ritual Effect Monster",
    "Toon Monster",
    "Pendulum Normal Monster",
    "Pendulum Effect Monster",
    "Pendulum Effect Fusion Monster",
    "Pendulum Tuner Effect Monster",
    "Pendulum Effect Ritual Monster",
    "Pendulum Flip Effect Monster",
    "Synchro Pendulum Effect Monster",
    "XYZ Pendulum Effect Monster",
    "Token",
    "Skill Card",
] as const

const TYPES_MONSTER_CARD = [
    "Normal Monster",
    "Gemini Monster",
    "Effect Monster",
    "Flip Effect Monster",
    "Union Effect Monster",
    "Normal Tuner Monster",
    "Tuner Monster",
    "Ritual Monster",
    "Fusion Monster",
    "Synchro Monster",
    "Synchro Tuner Monster",
    "XYZ Monster",
    "Link Monster",
    "Spirit Monster",
    "Ritual Effect Monster",
    "Toon Monster",
    "Pendulum Normal Monster",
    "Pendulum Effect Monster",
    "Pendulum Effect Fusion Monster",
    "Pendulum Tuner Effect Monster",
    "Pendulum Effect Ritual Monster",
    "Pendulum Flip Effect Monster",
    "Synchro Pendulum Effect Monster",
    "XYZ Pendulum Effect Monster",
    "Token",
    "Skill Card",
] as const

const TYPES_SPELL_OR_TRAP_CARD = ["Spell Card", "Trap Card", "Token", "Skill Card"] as const

export const TypeSpellOrTrapCardSchema = z.enum(TYPES_SPELL_OR_TRAP_CARD, { message: "Invalid Card Type" })
export const TypeMonsterCardSchema = z.enum(TYPES_MONSTER_CARD, { message: "Invalid Card Type" })
export const TypeYuGiOhCardSchema = z.enum(TYPES_YUGIOH_CARD, { message: "Invalid Card Type" })
