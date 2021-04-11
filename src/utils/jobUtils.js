module.exports={
    remainingDays(job){
        const remainingDays=(job["total-hours"]/job["daily-hours"]).toFixed();
    
        const createDate=new Date(job.createdAt);
        const dueDay=createDate.getDate() + Number(remainingDays); //+ dueDay: data de entrega
    
        const dueDateInMs=createDate.setDate(dueDay);
        const timeDiffInMs=dueDateInMs-Date.now(); //+ diferença da data de entrega para a data atual em ms
        const dayInMs=1000*60*60*24;
        const dayDiff=Math.floor(timeDiffInMs/dayInMs);
        return dayDiff; //+ dias restantes
    },
    calculateBudget(job,valueHour){
        return valueHour*job["total-hours"];
    }
}