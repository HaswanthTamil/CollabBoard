import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 2,
        maxlength: 50,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        minlength: 6,
        maxlength: 50,
        trim: true,
        lowercase: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
        unique: true 
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 5,
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
