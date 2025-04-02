/*
Send request to servers vai api calls
    url: address of the api call
    body: json containing parameters for the api calls 
    request_type: type of request to the server
        1: get some data from server
        2: idempotent request to update or create some data in the server
        3: non-idempotent to create some data in the server
        4: delete some data in the server
*/
export const fetch_request = async(url, body, request_type) => {
    let method;
    switch (request_type) {
        case 1:
            method = "GET";
            break;
        case 2:
            method = "PUT";
            break;
        case 3:
            method = "POST";
            break;
        case 4:
            method = "DELETE";
            break;
        default:
            console.log("Invalid request type argument");
            return;
    }

    try{
        const response = await fetch(
            url,
            {
                method: method,
                body: body,
                headers: {
                    "Content-Type": "application/json",
                  }
            });
        const data = await response.json();
        if(response.ok){
            console.log(data.message);
        }
        else{
            if(data.message){
                console.log(data.message);
            }
            console.log(data.error);
        }
    }
    catch(err){
        console.log(err);
    }

}

/*
Send a new order
    employee_id: id of te employee who sent the order
    drink_id: id of the drink ordered
    ice_level: ice level of the drink ordered
    surgar_level: surgar level of the drink ordered
    add_ons: array of add ons on the drink ordered
*/
export const send_order = async (employee_id, drink_id, ice_level, sugar_level, add_ons) => {
    const url = 'http://localhost:5000/api/send_orders/';
    const body = JSON.stringify([
        [employee_id, drink_id, ice_level, sugar_level, add_ons]
    ]);
    await fetch_request(url, body, 3);
}

/*
Edit price of a drink
    id: id of the drink
    new_price: the price to set to
*/
export const edit_drink_price = async (id, new_price) => {
    const url = 'http://localhost:5000/api/edit/drink';
    const body = JSON.stringify({
        drink_id: id,
        new_price: new_price,
    }
    );
    await put_fetch(url, body, 2);
}

/*
Edit quantity of a inventory item
    id: id of the inventory item
    value: changes to the quantity
    set_value:
        false - add value to the existing quantity
        true - replace the quantity with value
*/
export const edit_inventory_quantity = async (id, value, set_value) => {
    const url = 'http://localhost:5000/api/edit/inventory';
    const body = JSON.stringify({
        inventory_id: id,
        value: value,
        set_value: set_value
    }
    );
    await put_fetch(url, body, 2);
}

/*
Edit employee entry
    id: id of the employee
    name: new name of the employee
    sposition: new position of the employee
    store_id: new store_id of the employee
*/
export const edit_employee = async (id, name, position, store_id) => {
    const url = 'http://localhost:5000/api/edit/employee';
    const body = JSON.stringify({
        employee_id: id,
        name: name,
        position: position,
        store_id: store_id
    }
    );
    await put_fetch(url, body, 2);
}

/*
Add a new drink entry into the menu
    name: name of the new drink
    type: type of the new drink
    ingredient: array on ingredients used to make the drink
    amount: array on amount of each corrosponding ingredients uesd
    price: price of the new drink
*/
export const add_new_drink = async (name, type, ingredient, amount, price) => {
    const url = 'http://localhost:5000/api/insert/drink';
    const body = JSON.stringify({
        name: name,
        type: type,
        ingredient: ingredient,
        amount: amount,
        price: price
    }
    );
    await put_fetch(url, body, 2);
}

/*
Add a new ietm entry into the inventory
    name: name of the item
    type: type of the item
    store_id: id for which store's inventory to add the item entry 
*/
export const add_new_inventory = async (name, type, store_id) => {
    const url = 'http://localhost:5000/api/edit/inventory';
    const body = JSON.stringify({
        name: name,
        type: type,
        store_id: store_id
    }
    );
    await put_fetch(url, body, 2);
}

/*
Add a new employee entry
    name: name of the employee
    position: position of the employee
    store_id: id for which store the employee belongs to
*/
export const add_new_employee = async (name, position, store_id) => {
    const url = 'http://localhost:5000/api/edit/employee';
    const body = JSON.stringify({
        name: name,
        position: position,
        store_id: store_id
    }
    );
    await put_fetch(url, body, 2);
}

/*
Delete an entry from the database
    table_id:
        1 = drinks/menu
        2 = employees
        3 = inventory
    entry_id: id of the entry
*/
export const delete_entry = async (table_id, entry_id) => {
    const url = 'http://localhost:5000/api/delete';
    const body = JSON.stringify({
        table_id: table_id,
        id: entry_id
    }
    );
    await put_fetch(url, body, 4);
}