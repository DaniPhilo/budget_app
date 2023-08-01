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
import { useForm, useFieldArray } from "react-hook-form"
import { useState } from "react"
import NewExpenseModal from "./NewExpenseModal"
import { Label } from "./ui/label"

const formSchema = z.object({
    rent: z.number(),
    metroCard: z.number(),
    monthlyFood: z.number(),
    customFields: z.object({
        label: z.string(),
        value: z.number(),
    }).array(),
});

export function BudgetForm() {

    const [newFields, setNewFields] = useState(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rent: 0,
            metroCard: 0,
            monthlyFood: 0,
            customFields: []
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "customFields",
        control: form.control
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
                {/* <div>
                    <NewExpenseModal setNewFields={setNewFields} />
                </div> */}
                <div className="flex flex-col justify-start items-start gap-4">
                    {fields.map((field, index) => {
                        return (
                            <div key={index} className="flex flex-col jsutify-start items-start gap-4">
                                <FormField
                                    control={form.control}
                                    name={`customFields.${index}.label`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre del gasto</FormLabel>
                                            <Input
                                                type="text"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`customFields.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cantidad</FormLabel>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                value={field.value.toString()}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant={"destructive"}
                                    onClick={() => remove(index)}
                                    className="text-xs px-2 py-1"
                                >
                                    Eliminar este gasto
                                </Button>
                            </div>
                        )
                    })}
                    <Button
                        type="button"
                        variant={"green"}
                        onClick={() => append({ label: "", value: 0 })}
                    >
                        Nuevo gasto
                    </Button>
                </div>

                <Button type="submit" className="block ml-auto">Guardar</Button>
            </form>
        </Form>
    )
}
