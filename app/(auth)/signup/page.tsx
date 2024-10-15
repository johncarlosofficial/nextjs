"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };
    return (
        <>
            <div>Sign Up</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    {...register("name", {
                        required: true,
                        minLength: 3,
                        maxLength: 30,
                    })}
                />
                {errors.name?.type === "required" && (
                    <p>The name is required.</p>
                )}
                {errors.name?.type === "minLength" && (
                    <p>The name is too short.</p>
                )}
                {errors.name?.type === "maxLength" && (
                    <p>The name is too long.</p>
                )}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                />

                <label htmlFor="password">Passoword</label>
                <input
                    id="password"
                    type="text"
                    {...register("password", { required: true })}
                />

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default SignUp;
