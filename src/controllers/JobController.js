const Job = require("../model/Job");
const jobUtils = require("../utils/jobUtils");
const Profile = require("../model/Profile");

module.exports={
    index(req,res){
        const updateJobs=Job.get().map(job=>{
            const remaining =  jobUtils.remainingDays(job);
            const status=remaining<=0?"done": "progress";
            return {
                ...job,
                remaining,
                status,
                budget:jobUtils.calculateBudget(job,Profile.get()["value-hour"]),
            };
        });
        return res.render("index", {jobs:updateJobs});
    },
    create(req,res){
        return res.render("job")
    },     
    save(req,res){
        const lastId=Job.get()[Job.get().length-1]?.id || 0;
        Job.get().push({
            id:lastId+1,
            name: req.body.name,
            "daily-hours":req.body["daily-hours"],
            "total-hours":req.body["total-hours"],
            createdAt:Date.now(),
        });
        return res.redirect("/");
    },
    show(req,res){
        const jobId=req.params.id;
        const jobs=Job.get();
        const job=jobs.find(job => Number(job.id)===Number(jobId));
        if(!job){
            res.send("Job not found aqui");
        }

        job.budget=jobUtils.calculateBudget(job,Profile.get()["value-hour"]);
        return res.render("job-edit",{job});
    },
    update(req,res){
        const jobId=req.params.id;
        const jobs=Job.get();
        const job=jobs.find(job => Number(job.id)===Number(jobId));
        if(!job){
            res.send("Job not found");
        }

        const updatedJob={
            ...job,
            name:req.body.name,
            "total-hours":req.body["total-hours"],
            "daily-hours":req.body["daily-hours"]
        }

        const newJobs=jobs.map(job=>{
            if(Number(job.id)===Number(jobId)){
                job=updatedJob;
            }
            return job
        });
        Job.update(newJobs)
        res.redirect("/job/"+jobId);
    },
    delete(req,res){
        const jobId=req.params.id;
        
        Job.delete(jobId);

        return res.redirect("/");
    }
}