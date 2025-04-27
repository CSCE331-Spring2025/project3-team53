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
        let response;
        if(request_type !== 1){
            response = await fetch(
                url,
                {
                    method: method,
                    body: body,
                    headers: {"Content-Type": "application/json"}
                });
        }
        else{
            response = await fetch(
                url,
                {
                    method: method,
                });
        }
        const repjson = await response.json();
        if(response.ok){
            if(repjson.message){
                console.log(repjson.message);
            }
            if(repjson.data){
                //console.log(repjson.data)
            }
        }
        else{
            if(repjson.message){
                console.log(repjson.message);
            }
            console.log(repjson.error);
        }
        return repjson;
    }
    catch(err){
        console.log(err);
        return undefined;
    }

}

//global backend variables
let menu;
let orders = new Map(); 
let local_id = 1;   


/*
Send a new drink order
    employee_id: id of te employee who sent the order
    drink_id: id of the drink ordered
    ice_level: ice level of the drink ordered
    surgar_level: surgar level of the drink ordered
    add_ons: array of add ons on the drink ordered
*/
export const send_indv_order = async (employee_id, drink_id, ice_level, sugar_level, add_ons) => {
    const url = 'http://localhost:5000/api/send_orders/';
    const body = JSON.stringify([
        [employee_id, drink_id, ice_level, sugar_level, add_ons]
    ]);
    await fetch_request(url, body, 3);
}

/*
Stash a new drink order but does not send it
    employee_id: id of te employee who sent the order
    drink_id: id of the drink ordered
    ice_level: ice level of the drink ordered
    surgar_level: surgar level of the drink ordered
    add_ons: array of add ons on the drink ordered
*/
export const enqueue_order = (employee_id, drink_id, ice_level, sugar_level, add_ons) => {
    orders.set(local_id++, [employee_id, drink_id, ice_level, sugar_level, add_ons]);
}

/*
Delete a saved drink order in the stash
    id: 
        temporary id of the drink order saved
        or 0 to clear the entire stash
*/
export const dequeue_order = (id) => {
    if(id === 0){
        orders.clear();
        local_id = 1;
    }
    else{
        orders.delete(id);
        --local_id;
    }
}

/*
Returns an object containing on the saved drink orders stash, in format
    {
    <temporary id 1>:[employee_id_1, drink_id_1, ice_level_1, sugar_level_1, add_ons_1]
    <temporary id 2>:[employee_id_2, drink_id_2, ice_level_2, sugar_level_2, add_ons_2]
    ...
    }
*/
export const get_order_queue = () => {
    return orders;
}

/*
Sends the all the stashed orders
*/
export const send_order_queue = async () => {
    let temp = [];
    orders.forEach(arr => {
        temp.push(arr);
    })
    orders.clear();
    local_id = 1;
    const url = 'http://localhost:5000/api/send_orders/';
    const body = JSON.stringify(
        temp
    );
    return await fetch_request(url, body, 3);
};

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
    return (await fetch_request(url, body, 2));
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
    return (await fetch_request(url, body, 2));
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
    return (await fetch_request(url, body, 2));
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
    return (await fetch_request(url, body, 2));
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
    return (await fetch_request(url, body, 2));
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
    return (await fetch_request(url, body, 2));
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
    });
    return (await fetch_request(url, body, 4));
}


/*
Return analysis of order history between start to end hours on date
    date: yyyy:mm:dd format
    start: start hour in 24-hr format
    end: end hour in 24-hr format
outputs amount of dollar, drinks, and orders on each hour
*/
export const order_hist = async (date, start_hour, end_hour) => {
    const parameter = new URLSearchParams({
        date: date,
        start: start_hour,
        end: end_hour
    });
    const url = `http://localhost:5000/api/analyze/order_history?${parameter.toString()}`;
    //console.log(url);
    return (await fetch_request(url, {} ,1));
}

/*
Return amount of each ingredient used between the dates
    start_date: yyyy:mm:dd format
    end_date: yyyy:mm:dd format
*/
export const ingred_hist = async (start_date, end_date) => {
    const parameter = new URLSearchParams({
        start: start_date,
        end: end_date
    });
    const url = `http://localhost:5000/api/analyze/ingredients_use?${parameter.toString()}`;
    //console.log(url);
    return (await fetch_request(url, {} ,1));
}

/*
Return inventory of the store
    manager_id: manager id of the store
*/
export const get_inventory = async (manager_id) => {
    const parameter = new URLSearchParams({
        employee_id: manager_id
    });
    const url = `http://localhost:5000/api/analyze/inventory?${parameter.toString()}`;
    //console.log(url);
    return (await fetch_request(url, {} ,1));
}

/*
Return employee data of the store
    manager_id: manager id of the store
*/
export const get_employees = async (manager_id) => {
    const parameter = new URLSearchParams({
        employee_id: manager_id
    });
    const url = `http://localhost:5000/api/analyze/employee?${parameter.toString()}`;
    return (await fetch_request(url, {} ,1));
}



/*
Return the menu data
*/
fetch_request("http://localhost:5000/api/analyze/menu", {} ,1).then(res => {menu = res.data});
export const get_menu = () => {
    return menu;
}

/*
Updates the global menu variable; used after changes to menu data table
*/
export const refresh_menu = async () => {
    menu = (await fetch_request("http://localhost:5000/api/analyze/menu", {} ,1)).data;
}

/*
Return price of a drink + their add ons
    drink_id: id of the drink
    add_ons: string array of the add ons on the drink
*/
export const get_order_price = async (drink_id, add_ons) => {
    const url = 'http://localhost:5000/api/analyze/order_price';
    const body = JSON.stringify({
        drink_id: drink_id,
        add_ons: add_ons
    });
    return (await fetch_request(url, body ,2)).data;
}

/*
Return price of a drink + their add ons in the stash
*/
export const get_stash_price = async () => {
    const temp = new Map();
    let total_price = 0;
    await Promise.all(
        Array.from(orders).map(async ([key, value]) => {
            const price = await get_order_price(value[1],value[4]);
            temp.set(key, price);
            total_price += price;
        })
    );
    temp.set(0, total_price);
    return temp;
}

/*
Return data on the current weather in college station
Imagine having good cybersecruity practices
*/
export const get_weather = async () => {
    const url = "http://api.weatherapi.com/v1/current.json?key=44c96021f40a49f197114416252004&q=77845";
    let result = await fetch_request(url, {}, 1);
    return result;
}


export const translateText = async (text, targetLang) => {
    const url = 'http://localhost:5000/api/translate/translate';
    const body = JSON.stringify({ text, target: targetLang });
    const request_type = 3; 

    
    const response = await fetch_request(url, body, request_type);
    console.log(response);
    // Assuming the response contains the translated text
    return response.translatedText;
};