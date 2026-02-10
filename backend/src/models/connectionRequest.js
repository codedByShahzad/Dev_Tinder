import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not accepted",
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({fromUserId: 1, toUserId: 1})

// this is not mandetory
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this
    // Check if the fromUserId = toUserId

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannout send connection request to yourself")
    }
    next;
})

export const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
