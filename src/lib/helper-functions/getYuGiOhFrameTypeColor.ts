export default function getYugiohFrameTypeColor(frameType: string) {
    switch (frameType) {
        case "spell":
            return "spell.dark"
        case "trap":
            return "trap.dark"
        case "normal":
            return "normal.dark"
        case "effect":
            return "effect.dark"
        case "fusion":
            return "fusion.dark"
        case "ritual":
            return "ritual.dark"
        case "synchro":
            return "synchro.dark"
        case "xyz":
            return "xyz.dark"
        case "link":
            return "link.dark"
        case "pendulum":
            return "normal.dark"
        case "normal_pendulum":
            return "normal.dark"
        case "effect_pendulum":
            return "effect.dark"
        case "fusion_pendulum":
            return "fusion.dark"
        case "xyz_pendulum":
            return "xyz.dark"
        case "synchro_pendulum":
            return "synchro.dark"
        case "ritual_pendulum":
            return "ritual.dark"
        case "token":
            return "normal.dark"
        default:
            return "primary"
    }
}
