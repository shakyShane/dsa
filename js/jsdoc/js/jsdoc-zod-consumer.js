import { User } from "./jsdoc-zod";

/**
 * @param {User} user
 */
function signIn(user) {
    console.log(user);
}

signIn({
    name: "shane"
})

// use as validation
const parsed = User.safeParse({ name: "shane" })
if (parsed.success) {
    console.log(parsed.data)
} else {
    console.log(parsed.error)
}
