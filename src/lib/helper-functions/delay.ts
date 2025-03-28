export default async function delay(timeInMilliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, timeInMilliseconds))
}

// TODO: figure out if this can just be a setTimeout or if it needs to be async
// export default function delay(timeInMilliseconds: number) {
//     setTimeout(() => {}, timeInMilliseconds)
// }
