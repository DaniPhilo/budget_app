"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { BudgetDTO, BudgetSchema } from "@/interfaces/Budget"
import Image from "next/image"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/config"
import UpdateBtn from "../assets/edit-box-line.svg"
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Slider } from "./ui/slider"
import { DialogClose } from "@radix-ui/react-dialog"

interface SetBudgetFn {
    setBudgets: React.Dispatch<React.SetStateAction<BudgetDTO[] | []>>
}

type BudgetCardProps = BudgetDTO & SetBudgetFn

const UpdateDialog = ({ setBudgets, ...props }: BudgetCardProps) => {

    const form = useForm<z.infer<typeof BudgetSchema>>({
        resolver: zodResolver(BudgetSchema),
        defaultValues: {
            id: props.id ? props.id : "",
            name: props.name ? props.name : "",
            rent: props.rent ? props.rent : 0,
            metroCard: props.metroCard ? props.metroCard : 0,
            monthlyFood: props.monthlyFood ? props.monthlyFood : 0,
            customFields: props.customFields ? props.customFields : [],
            internet: props.internet ? props.internet : 0,
            bills: props.bills ? props.bills : 0,
            total: 0
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "customFields",
        control: form.control
    });

    function onSubmit(values: z.infer<typeof BudgetSchema>) {
        const sum: number = Object.values(values).reduce((acc: number, curr: any) => {
            if (typeof curr === "number") {
                return acc + curr
            } else if (typeof curr === "object") {
                return acc + curr.reduce((a: number, b: { label: string, value: number }) => a + b.value, 0);
            } else {
                return acc
            }
        }, 0);

        const id = values.id;
        delete values.id;
        values.total = sum;

        if (props.id) {
            updateDoc(doc(db, "budgets", props.id), values);
            setBudgets(prev => {
                const index = prev.findIndex(budget => budget.id === props.id);
                return [...prev.slice(0, index), { ...values, id }, ...prev.slice(index + 1)]
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Image
                    src={UpdateBtn}
                    alt=""
                    className="cursor-pointer"
                />
            </DialogTrigger>
            <DialogContent className="max-h-[500px] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Actualizar Presupuesto</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[400px] grow space-y-8">
                                <div className="flex flex-col justify-start items-start gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Nombre del presupuesto</FormLabel>
                                                <Input {...field} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="rent"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
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
                                            <FormItem className="w-full">
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
                                </div>

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
                                    name="bills"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Facturas (agua/luz/gas)</FormLabel>
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
                                    name="internet"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Internet</FormLabel>
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
                                <DialogClose asChild>
                                    <Button type="submit" className="block ml-auto">Guardar</Button>
                                </DialogClose>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateDialog