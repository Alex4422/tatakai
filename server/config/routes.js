module.exports = app => {
    require("../routes/Cards")(app);
    require("../routes/Accounts")(app);
    require("../routes/Faucet")(app);
    require("../routes/Docs")(app);
    require("../routes/Order")(app);
};