import * as z from "zod"

export const User = z.object({
    name: z.string()
})

export type User = z.infer<typeof User>
