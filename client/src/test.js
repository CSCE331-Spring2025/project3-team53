import * as func from './apiCall.js';

// func.send_indv_order(
//     1, 1, 1, 1, ["black_pearl","oreo"]
// );

//func.order_hist('2024-05-06', 12, 15).then(res => {console.log(res)});
//func.ingred_hist('2024-06-01', '2024-07-01').then(res => {console.log(res)});

// func.enqueue_order(1,2,3,4,['mini_pearl','pudding']);
// func.enqueue_order(1,2,3,4,['black_pearl']);
// console.log(func.get_order_queue());
// func.get_stash_price().then(result => {console.log(result)});
// func.send_order_queue();

// func.get_employees(1).then((result) => {
//     console.log(result)
// });

// export const getPrice = async () => {
//     const x = await func.get_order_price(2, ["creama", "oreo", "pudding"]);
//     console.log(x);
// };

func.get_menu().then((result) => {console.log(result.data)});
//func.get_order_price(2, ["creama", "oreo", "pudding"]).then((result) => {console.log(result)});

//func.add_new_drink('fdhsj', 'test', ["nuke"], [20], 120).then((result) => {console.log(result)});
//func.get_weather().then(result => console.log(result))