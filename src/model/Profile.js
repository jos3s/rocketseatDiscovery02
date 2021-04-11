const { update } = require("../controllers/ProfileController");

let data={
    name:"José Ulisses",
    avatar:"https://avatars.githubusercontent.com/u/50359547?v=4",
    "monthly-budget":3000,
    "days-per-week":5,
    "hours-per-day":5,
    "vacation-per-year":10,
    "value-hour":75
};

module.exports={
    get(){
        return data;
    },

    update(newData){
        data=newData;
    }
};