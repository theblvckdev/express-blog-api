const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors_options_config");
const { logger } = require("./middleware/log_events_middleware");
const authRroute = require("./routes/auth/auth_routes");

const app = express();

// request loggger middlewares
app.use(logger);

// built in middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// api route endpoints
app.use("/api/auth/", authRroute);

app.listen(PORT, () => console.log(`Server Runnung on Port:${PORT}`));
