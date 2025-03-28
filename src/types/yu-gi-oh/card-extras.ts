import { z } from "zod"

export const CardSetSchema = z.object({
    set_code: z.string(),
    set_name: z.string(),
    set_price: z.number(),
    set_rarity: z.string(),
    set_rarity_code: z.string(),
})

export const CardImageSchema = z.object({
    id: z.number(),
    image_url: z.string(),
    image_url_cropped: z.string(),
    image_url_small: z.string(),
})

export const CardPriceSchema = z.object({
    amazon_price: z.number(),
    cardmarket_price: z.number(),
    coolstuffinc_price: z.number(),
    ebay_price: z.number(),
    tcgplayer_price: z.number(),
})

export const MiscInfoSchema = z.object({
    beta_name: z.string(),
    downvotes: z.number(),
    formats: z.array(z.string()),
    has_effect: z.number(),
    konami_id: z.number(),
    md_rarity: z.string(),
    ocg_date: z.string(),
    tcg_date: z.string(),
    upvotes: z.number(),
    views: z.number(),
    viewsweek: z.number(),
})

export const BanlistInfoSchema = z
    .object({
        ban_goat: z.string().optional(),
        ban_ocg: z.string().optional(),
        ban_tcg: z.string().optional(),
    })
    .optional()
