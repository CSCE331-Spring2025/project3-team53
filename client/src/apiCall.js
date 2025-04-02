//base api call
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

export const send_order = async (employee_id, drink_id, ice_level, sugar_level, add_ons) => {
    const url = 'http://localhost:5000/api/send_orders/';
    const body = JSON.stringify([
        [employee_id, drink_id, ice_level, sugar_level, add_ons]
    ]);
    await fetch_request(url, body, 3);
}


export const edit_drink_price = async (id, new_price) => {
    const url = 'http://localhost:5000/api/edit/drink';
    const body = JSON.stringify({
        drink_id: id,
        new_price: new_price,
    }
    );
    await put_fetch(url, body, 2);
}

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

export const delete_entry = async (table_id, entry_id) => {
    const url = 'http://localhost:5000/api/delete';
    const body = JSON.stringify({
        table_id: table_id,
        id: entry_id
    }
    );
    await put_fetch(url, body, 4);
}