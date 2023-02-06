import inquirer from "inquirer";

let menu = {
    coffee: 3,
    tea: 2.5,
    latte: 3,
    coke: 1.5
};

let menuChoices = Object.keys(menu);
menuChoices.push("---Go to checkout---");

class CoffeShop {
    constructor(customerName) {
        this.name = customerName;
        this.order = [];
        this.total = 0;
    }

    calculateTotal() {

        console.log(`Thanks, ${this.name}`);

        for (let i = 0; i < this.order.length; i++) {
            console.log(this.order[i], `£${menu[this.order[i]]}`)

            this.total += menu[this.order[i]];
            
        }

        console.log(`Your total is ${this.total}£`)

    }

    set updateOrder(newItem) {
        this.order.push(newItem);
    }
}


const question = [
    {
        type: "input",
        name: "getName",
        message: "what is your name?"
    }
]

const nameResponse = await inquirer.prompt(question);


const customer = new CoffeShop( nameResponse.getName );


const askForOrder = async () => {
    const takeOrder = await inquirer.prompt([
        {
            type: "list",
            name: "getOrder",
            message: "What would you like to order?",
            choices: menuChoices
        }
    ])

    if(takeOrder.getOrder === "---Go to checkout---") {
        customer.calculateTotal();
        return;
    } else {
        customer.updateOrder = takeOrder.getOrder;
    }

    askForOrder();
}

askForOrder();



console.log( customer );








