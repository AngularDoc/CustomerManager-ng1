var express = require("express"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  errorhandler = require("errorhandler"),
  csrf = require("csurf"),
  api = require("./routes/api"),
  DB = require("./accessDB"),
  protectJSON = require("./lib/protectJSON"),
  app = express();

app.use(
  session({
    secret: "customermanagerstandard",
    saveUninitialized: true,
    resave: true
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorhandler());
app.use(protectJSON);
app.use(csrf());

app.use(function(req, res, next) {
  var csrf = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrf);
  res.locals._csrf = csrf;
  next();
});

process.on("uncaughtException", function(err) {
  if (err) console.log(err, err.stack);
});

//Local Connection
var conn = process.env.MONGODB_URI || "mongodb://localhost/customermanager";
var db = new DB.startup(conn);

// JSON API
var baseUrl = "/api/dataservice/";

app.get(baseUrl + "Customers", api.customers);
app.get(baseUrl + "Customer/:id", api.customer);
app.get(baseUrl + "CustomersSummary", api.customersSummary);
app.get(baseUrl + "CustomerById/:id", api.customer);

app.post(baseUrl + "PostCustomer", api.addCustomer);
app.put(baseUrl + "PutCustomer/:id", api.editCustomer);
app.delete(baseUrl + "DeleteCustomer/:id", api.deleteCustomer);

app.get(baseUrl + "States", api.states);

app.get(baseUrl + "CheckUnique/:id", api.checkUnique);

app.post(baseUrl + "Login", api.login);
app.post(baseUrl + "Logout", api.logout);

// Start server

app.listen(4215, function() {
  console.log(
    "CustMgr Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});