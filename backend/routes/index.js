const userRoutes = require("./user.routes");
const messageRoutes = require("./message.router");
const registerationRoutes = require("./registeration.routes");

module.exports = app => {

    //register all routes
    app.use("/api/users", userRoutes);
    app.use("/api/message", messageRoutes);
    app.use("/api/registeration", registerationRoutes);

}