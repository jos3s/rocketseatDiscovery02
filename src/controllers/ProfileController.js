const Profile = require("../model/Profile");

module.exports = {
    async index(req,res){
        return res.render("profile",{profile: await Profile.get()})
    },
    async update(req,res){
        const data=req.body;

        const weekPerYear=52;
        const weeksPerMonth=(weekPerYear-data["vacation-per-year"])/12;
        const weekTotalHours=data["hours-per-day"]*data["days-per-week"];
        const monthlyTotalHours=weekTotalHours*weeksPerMonth;

        const valueHour=data["monthly-budget"]/monthlyTotalHours;

        await Profile.update({
            ...await Profile.get(),
            ...req.body,
            "value-hour":valueHour,
        });

        return res.redirect("/profile");
    }
}