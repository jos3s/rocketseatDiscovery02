const express=require("express");
const routes=express.Router();

const views=__dirname+"/views/";

const Job={
    data:[
        {
            id:1,
            name: "Pizzaria Guloso",
            "daily-hours":2,
            "total-hours":0,
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
    ],
    controllers:{
        index(req,res){
            const updateJobs=Job.data.map(job=>{
                const remaining =  Job.services.remainingDays(job);
                const status=remaining<=0?"done": "progress";
                return {
                    ...job,
                    remaining,
                    status,
                    budget:Profile.data["value-hour"]*job["total-hours"],
                };
            });
            return res.render(views+"index", {jobs:updateJobs});
        },
        create(req,res){
            return res.render(views+"job")
        },     
        save(req,res){
            const lastId=Job.data[Job.data.length-1]?.id || 1;;
            Job.data.push({
                id:lastId+1,
                name: req.body.name,
                "daily-hours":req.body["daily-hours"],
                "total-hours":req.body["total-hours"],
                createdAt:Date.now(),
            });
            return res.redirect("/");
        }
    },
    services:{
        remainingDays(job){
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
    }
}

const Profile={
    data:{
        name:"José Ulisses",
        avatar:"https://avatars.githubusercontent.com/u/50359547?v=4",
        "monthly-budget":3000,
        "days-per-week":5,
        "hours-per-day":5,
        "vacation-per-year":10,
        "value-hour":75
    },
    controllers:{
        index(req,res){
            return res.render(views+"profile",{profile:Profile.data})
        }
    }
}

routes.get("/",Job.controllers.index);
routes.get("/job", Job.controllers.create);
routes.post("/job",Job.controllers.save);
routes.get("/job/edit",(req,res) => res.render(views+"job-edit"));
routes.get("/profile",Profile.controllers.index);

module.exports=routes;