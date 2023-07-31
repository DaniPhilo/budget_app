"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useForm } from "react-hook-form"

const formSchema = z.object({
    rent: z.number(),
    metroCard: z.number(),
    monthlyFood: z.number()
});

export function BudgetForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rent: 0,
            metroCard: 0,
            monthlyFood: 0
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="rent"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alquiler</FormLabel>
                            <Slider
                                onValueChange={(value) => field.onChange(Number(...value))}
                                defaultValue={[field.value]}
                                value={[field.value]}
                                max={1000}
                                min={0}
                                step={25}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rent"
                    render={({ field }) => (
                        <FormItem>
                            <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                min={0}
                                max={1000}
                                value={field.value.toString()}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="monthlyFood"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comida</FormLabel>
                            <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                min={0}
                                value={field.value.toString()}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="metroCard"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Abono de metro</FormLabel>
                            <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                min={0}
                                value={field.value.toString()}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
