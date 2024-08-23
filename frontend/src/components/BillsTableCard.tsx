import { useContext } from "react";
import { ModalContext, ModalContextType } from "../App";
import DetailedBillView from "./DetailedBillView";
import { Bill } from "./types";



function BillsTableCard(){

    const Bills: Bill[] = [
        {
            id: 1,
            storeName: "Loblaws",
            location: "Toronto, ON",
            totalAmount: 115.80,
            date: "2024-08-20",
            products: [
                { id: 1, brand: "Dole", name: "Bananas", price: 2.50, quantity: 6, units: "each", category: "Produce" },
                { id: 2, brand: "Coca-Cola", name: "Coke", price: 1.99, quantity: 12, units: "can", category: "Beverages" },
                { id: 3, brand: "Campbell's", name: "Tomato Soup", price: 3.79, quantity: 4, units: "can", category: "Pantry" },
                { id: 4, brand: "Kirkland", name: "Chicken Breast", price: 12.99, quantity: 1, units: "kg", category: "Meat" },
                { id: 5, brand: "Wonder", name: "White Bread", price: 3.49, quantity: 2, units: "loaf", category: "Bakery" },
                { id: 6, brand: "Lipton", name: "Tea Bags", price: 4.49, quantity: 1, units: "box", category: "Beverages" },
                { id: 7, brand: "Dole", name: "Apple", price: 0.99, quantity: 5, units: "each", category: "Produce" },
                { id: 8, brand: "Pillsbury", name: "Cookie Dough", price: 6.99, quantity: 1, units: "pack", category: "Bakery" },
                { id: 9, brand: "President's Choice", name: "Frozen Pizza", price: 7.99, quantity: 2, units: "each", category: "Frozen" },
                { id: 10, brand: "Tide", name: "Laundry Detergent", price: 9.99, quantity: 1, units: "bottle", category: "Household" }
            ]
        },
        {
            id: 2,
            storeName: "Metro",
            location: "Montreal, QC",
            totalAmount: 82.45,
            date: "2024-08-21",
            products: [
                { id: 11, brand: "McCain", name: "French Fries", price: 4.99, quantity: 2, units: "bag", category: "Frozen" },
                { id: 12, brand: "Kraft", name: "Mac & Cheese", price: 1.29, quantity: 5, units: "box", category: "Pantry" },
                { id: 13, brand: "Avocados", name: "Avocado", price: 2.50, quantity: 4, units: "each", category: "Produce" },
                { id: 14, brand: "Tim Hortons", name: "Coffee", price: 8.99, quantity: 1, units: "bag", category: "Beverages" },
                { id: 15, brand: "Pillsbury", name: "Grands Biscuits", price: 3.99, quantity: 1, units: "pack", category: "Bakery" },
                { id: 16, brand: "Nestle", name: "Ice Cream", price: 5.49, quantity: 2, units: "tub", category: "Frozen" },
                { id: 17, brand: "Hunt's", name: "Ketchup", price: 2.79, quantity: 1, units: "bottle", category: "Pantry" },
                { id: 18, brand: "Dole", name: "Oranges", price: 3.99, quantity: 6, units: "each", category: "Produce" },
                { id: 19, brand: "Lysol", name: "Disinfectant Wipes", price: 6.49, quantity: 1, units: "pack", category: "Household" },
                { id: 20, brand: "Frito-Lay", name: "Chips", price: 4.29, quantity: 3, units: "bag", category: "Snacks" }
            ]
        },
        {
            id: 3,
            storeName: "Sobeys",
            location: "Halifax, NS",
            totalAmount: 98.60,
            date: "2024-08-22",
            products: [
                { id: 21, brand: "Red Bull", name: "Energy Drink", price: 2.79, quantity: 6, units: "can", category: "Beverages" },
                { id: 22, brand: "Barilla", name: "Pasta", price: 2.99, quantity: 3, units: "box", category: "Pantry" },
                { id: 23, brand: "Ben's", name: "Rice", price: 4.49, quantity: 2, units: "bag", category: "Pantry" },
                { id: 24, brand: "Sweet Baby Ray's", name: "BBQ Sauce", price: 3.49, quantity: 1, units: "bottle", category: "Pantry" },
                { id: 25, brand: "Organic Valley", name: "Milk", price: 5.99, quantity: 1, units: "carton", category: "Dairy" },
                { id: 26, brand: "Hellmann's", name: "Mayonnaise", price: 4.99, quantity: 1, units: "jar", category: "Pantry" },
                { id: 27, brand: "Gala", name: "Gala Apples", price: 1.89, quantity: 6, units: "each", category: "Produce" },
                { id: 28, brand: "Knorr", name: "Bouillon Cubes", price: 3.29, quantity: 1, units: "box", category: "Pantry" },
                { id: 29, brand: "Nature Valley", name: "Granola Bars", price: 4.79, quantity: 2, units: "box", category: "Snacks" },
                { id: 30, brand: "Heinz", name: "Baked Beans", price: 2.49, quantity: 4, units: "can", category: "Pantry" }
            ]
        },
        {
            id: 4,
            storeName: "Save-On-Foods",
            location: "Vancouver, BC",
            totalAmount: 105.35,
            date: "2024-08-23",
            products: [
                { id: 31, brand: "Yoplait", name: "Yogurt", price: 3.49, quantity: 4, units: "cup", category: "Dairy" },
                { id: 32, brand: "Sunkist", name: "Orange Juice", price: 3.99, quantity: 2, units: "bottle", category: "Beverages" },
                { id: 33, brand: "Tostitos", name: "Tortilla Chips", price: 3.99, quantity: 3, units: "bag", category: "Snacks" },
                { id: 34, brand: "Butterball", name: "Ground Turkey", price: 9.49, quantity: 1, units: "kg", category: "Meat" },
                { id: 35, brand: "Jif", name: "Peanut Butter", price: 5.99, quantity: 1, units: "jar", category: "Pantry" },
                { id: 36, brand: "Pineapple", name: "Pineapple", price: 3.49, quantity: 2, units: "each", category: "Produce" },
                { id: 37, brand: "Dawn", name: "Dish Soap", price: 4.49, quantity: 1, units: "bottle", category: "Household" },
                { id: 38, brand: "Glad", name: "Garbage Bags", price: 7.99, quantity: 1, units: "roll", category: "Household" },
                { id: 39, brand: "Kellogg's", name: "Cornflakes", price: 4.29, quantity: 1, units: "box", category: "Pantry" },
                { id: 40, brand: "Oroweat", name: "Whole Wheat Bread", price: 4.49, quantity: 2, units: "loaf", category: "Bakery" }
            ]
        },
        {
            id: 5,
            storeName: "No Frills",
            location: "Ottawa, ON",
            totalAmount: 87.75,
            date: "2024-08-24",
            products: [
                { id: 41, brand: "Tropicana", name: "Apple Juice", price: 3.49, quantity: 2, units: "bottle", category: "Beverages" },
                { id: 42, brand: "Green Giant", name: "Frozen Vegetables", price: 5.99, quantity: 2, units: "bag", category: "Frozen" },
                { id: 43, brand: "Ritz", name: "Crackers", price: 3.49, quantity: 1, units: "box", category: "Snacks" },
                { id: 44, brand: "Oasis", name: "Yogurt Drinks", price: 4.29, quantity: 6, units: "bottle", category: "Dairy" },
                { id: 45, brand: "Dole", name: "Pineapple Chunks", price: 2.79, quantity: 2, units: "can", category: "Pantry" },
                { id: 46, brand: "Breyers", name: "Ice Cream", price: 6.99, quantity: 1, units: "tub", category: "Frozen" },
                { id: 47, brand: "Lactantia", name: "Butter", price: 4.99, quantity: 1, units: "pack", category: "Dairy" },
                { id: 48, brand: "Dove", name: "Soap Bars", price: 5.99, quantity: 1, units: "pack", category: "Personal Care" },
                { id: 49, brand: "Barilla", name: "Spaghetti", price: 2.49, quantity: 2, units: "box", category: "Pantry" },
                { id: 50, brand: "Whiskas", name: "Cat Food", price: 7.99, quantity: 1, units: "bag", category: "Pet Care" }
            ]
        }
    ];
    
    let { setShowModal, setModalContent } = useContext(ModalContext) as ModalContextType;
    
    function handleBillClick(bill: Bill){
        setShowModal(true);
        setModalContent(<DetailedBillView bill={bill}/>);
    }

    return (
        <div className="flex flex-col gap-3 p-5">
            {Bills.map((bill) => {
                return (
                    <div key={bill.id} className="flex justify-between items-center bg-slate-300 px-4 py-2 rounded-lg shadow-lg cursor-pointer" onClick={() => handleBillClick(bill)}>
                        <div>
                            <h3 className="text-lg">{bill.storeName}</h3>
                            <p className="text-sm">{bill.date}</p>
                        </div>
                        <h3 className="text-xl">${bill.totalAmount}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default BillsTableCard;