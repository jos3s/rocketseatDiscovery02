let data=[
    {
        id:1,
        name: "Pizzaria Guloso",
        "daily-hours":2,
        "total-hours":1,
        createdAt: Date.now()
    },
    {
        id:2,
        name: "OneTwo Project",
        "daily-hours":4,
        "total-hours":47,
        createdAt:Date.now()
    }
]

module.exports={
    get(){
        return data;
    },
    update(newData){
        data=newData;
    },
    delete(id){
        data=data.filter(job=>Number(job.id)!==Number(id));
    }
}