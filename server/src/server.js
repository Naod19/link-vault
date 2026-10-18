import "dotenv/config";
import app from "./app.js";
import connectDB from "./configs/db.js";
import * as logger from "./utils/logger.js";

const PORT = process.env.PORT || 8000;

const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			logger.info(`Server is running on port http://localhost:${PORT}`);
		});
	} catch (error) {
		logger.error("failed to start app", error.message);
		process.exit(1);
	}
};

start();
