"use client"

import { useEffect, useState } from "react"
import { BudgetDTO } from "@/interfaces/Budget";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import BudgetCard from "./BudgetCard";
import { Button } from "./ui/button";
import LoadingSpinner from "./LoadingSpinner";

const BudgetDisplay = () => {

    const [budgets, setBudgets] = useState<BudgetDTO[] | []>([]);
    const [ascOrder, setAscOrder] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const getBudgets = async () => {
        setLoading(true);
        const budgetDocs = (await getDocs(collection(db, "budgets"))).docs;
        if (!budgetDocs.length) {
            setLoading(false);
        } else {
            setLoading(false);
            setBudgets(budgetDocs.map(doc => ({ ...doc.data(), id: doc.id }) as BudgetDTO));
        }
    }

    useEffect(() => {
        getBudgets();
    }, []);

    return (
        <div className="flex flex-col justify-start items-start gap-8">
            <div className="w-full flex justify-center items-center gap-4">
                <Button
                    variant={ascOrder ? "orderSelected" : "order"}
                    onClick={() => setAscOrder(true)}
                >
                    ASC
                </Button>
                <Button
                    variant={ascOrder ? "order" : "orderSelected"}
                    onClick={() => setAscOrder(false)}
                >
                    DES
                </Button>
            </div>
            <div className="w-full flex flex-wrap justify-center  items-start gap-4">
                {
                    loading ?
                        <div className="w-full mt-20 flex justify-center items-center">
                            <LoadingSpinner />
                        </div>
                        :
                        budgets.length > 0 ?
                            budgets
                                .sort((a, b) => ascOrder ? a.total - b.total : b.total - a.total)
                                .map(budget => {
                                    return <BudgetCard key={budget.id} setBudgets={setBudgets} {...budget} />
                                })
                            :
                            <p>No budgets saved...</p>
                }

            </div>
        </div>
    )
}

export default BudgetDisplay