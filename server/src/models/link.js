import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		default: "",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

linkSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
