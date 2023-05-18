import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userid: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userToken = mongoose.model('tokens',tokenSchema)

export default userToken;
