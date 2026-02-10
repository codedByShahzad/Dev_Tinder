// controllers/requestController.js
import { ConnectionRequest } from '../models/connectionRequest.js';
import { User } from '../models/userModel.js';

export const sendRequest = async (req, res) => {
  try {
    
    const fromUserId = req.user._id
    const toUserId = req.params.toUserId
    const status = req.params.status

    const alowedStatus = ["ignored", "interested"]

    if (!alowedStatus.includes(status)) {
        return res.json({
            message: "Invalid Status Type"
        })
    }

    // if there is existing Connection Request Exist or Not


    const checkToUserExist = await User.findById(toUserId)

    if (!checkToUserExist) {
         return res.status(404).json({
            message: "User Not Found"
        })
    }


    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            {fromUserId, toUserId},
            {fromUserId: toUserId, toUserId: fromUserId}
        ]
    })

    if (existingConnectionRequest) {
        return res.status(404),json({
            message: "Connection Request Already Exists !"
        })
    }

    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    })

    const data = await connectionRequest.save()
    
    res.json({
        success: true,
        message: "Connection Request Send Successfully",
        data
    })

  } catch (error) {
    res.status(404).json({
        success: false,
        message: "Error in Sending Request",
        error: error.message
    })
  }
};
