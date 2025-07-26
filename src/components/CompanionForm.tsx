"use client"
import React from 'react';
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {subjects} from "@/constants";
import {Textarea} from "@/components/ui/textarea";

const formSchema = z.object({
    name: z.string().min(1, {message: 'Name is required.'}).max(50),
    subject: z.string().min(1, {message: 'Subject is required.'}).max(50),
    topic: z.string().min(1, {message: 'Topic is required.'}),
    voice: z.string().min(1, {message: 'Voice is required.'}),
    style: z.string().min(1, {message: 'Style is required.'}),
    duration: z.number().min(1, {message: 'Duration is required.'})
})

const CompanionForm = () => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15
        },
    })

    // 2. Define a submit handler.
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the companion name"
                                    className="input"
                                    {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select value={field.value}
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full input capitalize">
                                        <SelectValue placeholder="Select the subject"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>

                    )}
                /> <FormField
                control={form.control}
                name="topic"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>What should the companion help with</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Ex. Derivaties or Integrals."
                                className="input"
                                {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>

                )}
            /> <FormField
                control={form.control}
                name="voice"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Voice</FormLabel>
                        <FormControl>
                            <Select value={field.value}
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}>
                                <SelectTrigger className="w-full input capitalize">
                                    <SelectValue placeholder="Select the voice"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {['Male', 'Female'].map((value) => (
                                        <SelectItem key={value} value={value}>{value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>

                )}
            /> <FormField
                control={form.control}
                name="style"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Style</FormLabel>
                        <FormControl>
                            <Select value={field.value}
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}>
                                <SelectTrigger className="w-full input capitalize">
                                    <SelectValue placeholder="Select the style"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {['Formal', 'Casual'].map((value) => (
                                        <SelectItem key={value} value={value}>{value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>

                )}
            /> <FormField
                control={form.control}
                name="duration"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Estimated session duration in minutes</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="15"
                                className="input"
                                {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>

                )}
            />
                <Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
            </form>
        </Form>
    );
};

export default CompanionForm;
