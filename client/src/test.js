import * as func from './apiCall.js';

// func.send_order(
//     1, 1, 1, 1, ["black_pearl"]
// );

//func.order_hist('2024-05-06', 12, 15);
//func.ingred_hist('2024-06-01', '2024-07-01');

func.enqueue_order(1,2,3,4,['mini_pearl','pudding']);
func.enqueue_order(1,2,3,4,['black_pearl']);
console.log(func.get_order_queue());
func.send_order_queue();
