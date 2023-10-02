import * as z from "zod"

export const User = z.object({
    name: z.string()
})

/**
 * @typedef {import("zod").infer<typeof User>} User
 */
