"use client";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    //  This schema specifies the rules for each form field.
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters." })
        .max(30, { message: "Name must be less than 30 characters." }),

    email: z.string().email({ message: "Please enter a valid email address." }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })

        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter.",
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter.",
        })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number.",
        })
        .regex(/[@$!%*?&]/, {
            message:
                "Password must contain at least one special character (@, $, !, %, *, ?, &).",
        }),
});

type FormData = z.infer<typeof schema>;
// Use zod's infer to automatically generate a TypeScript type from the Zod schema.

const SignUp = () => {
    // Set up React Hook Form with validation rules from Zod using zodResolver.
    const {
        register, // This function registers form inputs, handling their state and validation.
        handleSubmit, // This function processes the form submission.
        formState: { errors }, // Holds validation errors returned by Zod.
    } = useForm<FormData>({ resolver: zodResolver(schema) });
    // useForm accepts a configuration object where the resolver is set to zodResolver with our schema.

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <>
            <div>Sign Up</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" {...register("name")} />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default SignUp;
