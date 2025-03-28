import { z } from "zod"

import ArchetypeSchema from "./archetype"
import AttributeMonsterCardSchema from "./attribute"
import { BanlistInfoSchema, CardImageSchema, CardPriceSchema, CardSetSchema, MiscInfoSchema } from "./card-extras"
import { TypeMonsterCardSchema, TypeSpellOrTrapCardSchema, TypeYuGiOhCardSchema } from "./card-type"
import {
    FrameTypeMonsterCardSchema,
    FrameTypePendulumCardSchema,
    FrameTypeSpellOrTrapCardSchema,
    FrameTypeYuGiOhCardSchema,
} from "./frame-type"
import { LevelSchema, PendulumScaleSchema } from "./level-and-pendulum-scale"
import { LinkMarkersSchema, LinkValueSchema } from "./linkvalue-and-linkmarkers"
import { RaceMonsterCardSchema, RaceSpellOrTrapCardSchema, RaceYuGiOhCardSchema } from "./race"

const YuGiOhCardBaseSchema = z.object({
    archetype: ArchetypeSchema.default("None"),
    banlist_info: BanlistInfoSchema,
    card_images: z.array(CardImageSchema).optional(),
    card_prices: z.array(CardPriceSchema).optional(),
    card_sets: z.array(CardSetSchema).optional(),
    desc: z.string().min(1, "Description Must Be At Least 1 Character Long"),
    frameType: FrameTypeYuGiOhCardSchema,
    id: z
        .number()
        .refine((val) => val.toString().length >= 4, {
            message: "ID must be at least 4 digits long",
        })
        .refine((val) => val.toString().length <= 9, {
            message: "ID must be at most 9 digits long",
        }),
    imageUrl: z.string().min(1, "Image URL Must Be At Least 1 Character Long"),
    misc_info: z.array(MiscInfoSchema).optional(),
    name: z.string().min(1, "Name Must Be At Least 1 Character Long"),
    price: z
        .number()
        .min(0, "Price Must Be Greater Than Or Equal To 0")
        .max(999999, "Price Must Be Less Than Or Equal To 999999"),
    race: RaceYuGiOhCardSchema,
    type: TypeYuGiOhCardSchema,
    ygoprodeck_url: z.string().min(1, "URL Must Be At Least 1 Character Long"),
})

const LinkCardSchema = YuGiOhCardBaseSchema.extend({
    atk: z.number().min(0, "Attack Must Be Greater Than Or Equal To 0"),
    attribute: AttributeMonsterCardSchema,
    frameType: z.literal("link"),
    linkmarkers: LinkMarkersSchema,
    linkval: LinkValueSchema,
    type: z.literal("Link Monster"),
})

const MonsterCardSchema = YuGiOhCardBaseSchema.extend({
    atk: z.number().min(0, "Attack Must Be Greater Than Or Equal To 0"),
    attribute: AttributeMonsterCardSchema,
    def: z.number().min(0, "Defense Must Be Greater Than Or Equal To 0"),
    frameType: FrameTypeMonsterCardSchema,
    level: LevelSchema,
    race: RaceMonsterCardSchema,
    type: TypeMonsterCardSchema,
})

const PendulumCardSchema = MonsterCardSchema.extend({
    frameType: FrameTypePendulumCardSchema,
    monster_desc: z.string().min(1, "Monster Description Must Be At Least 1 Character Long"),
    pend_desc: z.string().min(1, "Pendulum Description Must Be At Least 1 Character Long"),
    scale: PendulumScaleSchema,
})

const SpellOrTrapCardSchema = YuGiOhCardBaseSchema.extend({
    frameType: FrameTypeSpellOrTrapCardSchema,
    race: RaceSpellOrTrapCardSchema,
    type: TypeSpellOrTrapCardSchema,
})

const YuGiOhCardSchema = z.union([PendulumCardSchema, LinkCardSchema, MonsterCardSchema, SpellOrTrapCardSchema])

const YuGiOhCardWithoutIdSchema = z.union([
    LinkCardSchema.omit({ id: true }),
    PendulumCardSchema.omit({ id: true }),
    MonsterCardSchema.omit({ id: true }),
    SpellOrTrapCardSchema.omit({ id: true }),
])

type YuGiOhCardWithoutId = z.infer<typeof YuGiOhCardWithoutIdSchema>
type YuGiOhCard = z.infer<typeof YuGiOhCardSchema>

export { YuGiOhCardSchema, YuGiOhCardWithoutIdSchema }
export type { YuGiOhCard, YuGiOhCardWithoutId }
