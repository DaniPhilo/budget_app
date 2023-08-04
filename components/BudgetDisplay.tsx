"use client"

import { useEffect, useState } from "react"
import { BudgetDTO } from "@/interfaces/Budget";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import BudgetCard from "./BudgetCard";

const BudgetDisplay = () => {

    const [budgets, setBudgets] = useState<BudgetDTO[] | []>([]);

    const getBudgets = async () => {
        const budgetDocs = (await getDocs(collection(db, "budgets"))).docs;
        setBudgets(budgetDocs.map(doc => ({ ...doc.data(), id: doc.id }) as BudgetDTO));
    }

    useEffect(() => {
        getBudgets();
    }, []);

    return (
        <div className="flex flex-wrap justify-start items-start gap-4">
            {
                budgets.length > 0 ?
                    budgets.map(budget => {
                        return <BudgetCard key={budget.id} setBudgets={setBudgets} {...budget} />
                    })
                    :
                    <p>No budgets saved...</p>
            }
        </div>
    )
}

export default BudgetDisplay