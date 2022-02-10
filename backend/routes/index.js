const userRoutes = require("./user.routes");
const messageRoutes = require("./message.router");
const profileroutes = require("./profile.route");

module.exports = app => {

    //register all routes
    app.use("/api/users", userRoutes);
    app.use("/api/message", messageRoutes);
    app.use("/api/profile", profileroutes);

}