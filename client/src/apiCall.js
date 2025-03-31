export const send_order = async (employee_id, drink_id, ice_level, sugar_level, add_ons) => {
    try{
        const url = 'http://localhost:5000/api/send_orders/';
        const body = JSON.stringify([
            [employee_id, drink_id, ice_level, sugar_level, add_ons]
        ]);
        const response = await fetch(url,
                {
                    method: "POST",
                    body: body,
                    headers: {
                        "Content-Type": "application/json",
                      }
                });
        if(response.ok){
            console.log("Send order call done");
        }
        else{
            console.log("Send order call failed");
            //console.log(response);
        }
        
    }
    catch(error){
        console.log(error);
    }
}