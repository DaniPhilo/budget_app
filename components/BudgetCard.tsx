"use client"

import { BudgetDTO } from "@/interfaces/Budget"
import DeleteBtn from "../assets/delete-bin-line.svg"
import Image from "next/image"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/config"

interface SetBudgetFn {
    setBudgets: React.Dispatch<React.SetStateAction<BudgetDTO[] | []>>
}

type BudgetCardProps = BudgetDTO & SetBudgetFn

const BudgetCard = ({ id, bills, internet, name, rent, monthlyFood, metroCard, customFields, total, setBudgets }: BudgetCardProps) => {

    // const total: number = rent + monthlyFood + metroCard + customFields.reduce((acc, curr) => acc + curr.value, 0);

    const deleteBudget = () => {
        if (id) {
            deleteDoc(doc(db, "budgets", id));
            setBudgets(prev => prev.filter(budget => budget.id !== id));
        }
    }

    return (
        <div className="relative w-[250px] p-4 flex flex-col justify-start items-start gap-2 shadow-md border rounded">
            <Image
                src={DeleteBtn}
                alt=""
                className="absolute top-2 right-2 cursor-pointer"
                onClick={deleteBudget}
            />
            <h2 className="text-lg font-semibold underline">{name}</h2>
            <p>Alquiler: {rent}€</p>
            <p>Comida: {monthlyFood}€</p>
            <p>Abono de metro: {metroCard}€</p>
            <p>Facturas (agua/luz/gas): {bills}€</p>
            <p>Internet: {internet}€</p>
            {
                customFields.map((field, i) => {
                    return <p key={i}>{field.label}: {field.value}€</p>
                })
            }
            <p className="mt-2 text-lg font-medium">Total: {total}€</p>
        </div>
    )
}

export default BudgetCard