"use client"

import { BudgetDTO } from "@/interfaces/Budget"
import DeleteBtn from "../assets/delete-bin-line.svg"
import Image from "next/image"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/config"
import UpdateDialog from "./UpdateDialog"

interface SetBudgetFn {
    setBudgets: React.Dispatch<React.SetStateAction<BudgetDTO[] | []>>
}

type BudgetCardProps = BudgetDTO & SetBudgetFn

const BudgetCard = ({ setBudgets, ...props }: BudgetCardProps) => {
    
    const deleteBudget = () => {
        if (props.id) {
            deleteDoc(doc(db, "budgets", props.id));
            setBudgets(prev => prev.filter(budget => budget.id !== props.id));
        }
    }

    return (
        <div className="w-[250px] p-4 flex flex-col justify-start items-start gap-2 shadow-md border rounded">
            <h2 className="text-lg font-semibold underline">{props.name}</h2>
            <p>Alquiler: {props.rent}€</p>
            <p>Comida: {props.monthlyFood}€</p>
            <p>Abono de metro: {props.metroCard}€</p>
            <p>Facturas (agua/luz/gas): {props.bills}€</p>
            <p>Internet: {props.internet}€</p>
            {
                props.customFields.map((field, i) => {
                    return <p key={i}>{field.label}: {field.value}€</p>
                })
            }
            <div className="w-full flex justify-between items-center">
                <p className="text-lg font-medium">Total: {props.total}€</p>
                <div className="flex justify-center items-center gap-4">
                    <Image
                        src={DeleteBtn}
                        alt=""
                        className="cursor-pointer"
                        onClick={deleteBudget}
                    />
                    <UpdateDialog {...props} setBudgets={setBudgets} />
                </div>
            </div>
        </div>
    )
}

export default BudgetCard