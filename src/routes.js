const express=require("express");
const routes=express.Router();

const views=__dirname+"/views/";

const profile={
    name:"José Ulisses",
    avatar:"https://avatars.githubusercontent.com/u/50359547?v=4",
    "monthly-budget":3000,
    "days-per-week":5,
    "hours-per-day":5,
    "vacation-per-year":10,
    "value-hour":75
}

const jobs=[
    {
        id:1,
        name: "Pizzaria Guloso",
        "daily-hours":2,
        "total-hours":60,
        createdAt: Date.now(),
        budget:3000,
        remaining:3,
        status:"progress"
    },
    {
        id:2,
        name: "OneTwo Project",
        "daily-hours":4,
        "total-hours":47,
        createdAt:Date.now(),
        budget:4500,
        remaining:4,
        status:"progress"
    }
]

function remainingDays(job){
    const remainingDays=(job["total-hours"]/job["daily-hours"]).toFixed();

    const createDate=new Date(job.createdAt);
    const dueDay=createDate.getDate() + Number(remainingDays); //+ dueDay: data de entrega

    console.log(dueDay)
    const dueDateInMs=createDate.setDate(dueDay);
    console.log(dueDateInMs)
    const timeDiffInMs=dueDateInMs-Date.now(); //+ diferença da data de entrega para a data atual em ms
    const dayInMs=1000*60*60*24;
    const dayDiff=Math.floor(timeDiffInMs/dayInMs);
    console.log(timeDiffInMs,dayInMs)
    return dayDiff; //+ dias restantes
}

routes.get("/",(req,res) => {
    const updateJobs=jobs.map(job=>{
        const remaining =  remainingDays(job);
        const status=remaining<=0?"done": "progress";
        return {
            ...job,
            remaining,
            status,
            budget:profile["value-hour"]*job["total-hours"],
        };
    });

    return res.render(views+"index", {jobs:updateJobs});
});


routes.get("/job",(req,res) => res.render(views+"job"));
routes.post("/job",(req,res) =>{
    const lastId=jobs[jobs.length-1]?.id || 1;;
    jobs.push({
        id:lastId+1,
        name: req.body.name,
        "daily-hours":req.body["daily-hours"],
        "total-hours":req.body["total-hours"],
        createdAt:Date.now(),
    });
    return res.redirect("/");
});
routes.get("/job/edit",(req,res) => res.render(views+"job-edit"));
routes.get("/profile",(req,res) => res.render(views+"profile",{profile}));

module.exports=routes;