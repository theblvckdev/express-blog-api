const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors_options_config");
const { logger } = require("./middleware/log_events_middleware");

const app = express();

// request loggger middlewares
app.use(logger);

// built in middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Runnung on Port:${PORT}`));
