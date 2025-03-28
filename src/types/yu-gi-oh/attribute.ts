import { z } from "zod"

const ATTRIBUTE_MONSTER_CARD = ["Dark", "Divine", "Earth", "Fire", "Light", "Water", "Wind"] as const

const AttributeMonsterCardSchema = z.enum(ATTRIBUTE_MONSTER_CARD, { message: "Invalid Attribute" })

export default AttributeMonsterCardSchema
