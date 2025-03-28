import { z } from "zod"

const FRAME_TYPES_SPELL_OR_TRAP_CARD = ["spell", "trap", "skill", "token"] as const

const FRAME_TYPES_MONSTER_CARD = [
    "normal",
    "effect",
    "ritual",
    "fusion",
    "synchro",
    "xyz",
    "link",
    "normal_pendulum",
    "effect_pendulum",
    "ritual_pendulum",
    "fusion_pendulum",
    "synchro_pendulum",
    "xyz_pendulum",
    "skill",
    "token",
] as const

const FRAME_TYPES_PENDULUM_CARD = [
    "normal_pendulum",
    "effect_pendulum",
    "ritual_pendulum",
    "fusion_pendulum",
    "synchro_pendulum",
    "xyz_pendulum",
    "skill",
    "token",
] as const

const FRAME_TYPE_YUGIOH_CARD = [
    "spell",
    "trap",
    "normal",
    "effect",
    "ritual",
    "fusion",
    "synchro",
    "xyz",
    "link",
    "normal_pendulum",
    "effect_pendulum",
    "ritual_pendulum",
    "fusion_pendulum",
    "synchro_pendulum",
    "xyz_pendulum",
    "skill",
    "token",
] as const

export const FrameTypeSpellOrTrapCardSchema = z.enum(FRAME_TYPES_SPELL_OR_TRAP_CARD, { message: "Invalid Frame Type" })
export const FrameTypeMonsterCardSchema = z.enum(FRAME_TYPES_MONSTER_CARD, { message: "Invalid Frame Type" })
export const FrameTypePendulumCardSchema = z.enum(FRAME_TYPES_PENDULUM_CARD, { message: "Invalid Frame Type" })
export const FrameTypeYuGiOhCardSchema = z.enum(FRAME_TYPE_YUGIOH_CARD, { message: "Invalid Frame Type" })
