// controllers/requestController.js
import { ConnectionRequest } from "../models/connectionRequest.js";
import { User } from "../models/userModel.js";

export const sendRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const alowedStatus = ["ignored", "interested"];

    if (!alowedStatus.includes(status)) {
      return res.json({
        message: "Invalid Status Type",
      });
    }

    // if there is existing Connection Request Exist or Not

    const checkToUserExist = await User.findById(toUserId);

    if (!checkToUserExist) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(404).json({
        message: "Connection Request Already Exists !",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      success: true,
      message:
        req.user.firstName +
        " is " +
        status +
        " in " +
        checkToUserExist.firstName,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error in Sending Request",
      error: error.message,
    });
  }
};

export const reviewRequest = async (req, res) => {
  //Validate the status form the url
  // Shahzad => Naqash
  // Naqash Should be loggedin to Accept the request
  // status = intrested only if shahzad ignored the request then it should not be appeared
  // requestId should be valid

  try {
    const loggedInUser = req.user;
    const {status, requestId} = req.params

    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
        return res.status(404).json({
            success: false,
            message: "Stauts Not Allowed"
        })
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser,
        status: "interested"
    })

    if (!connectionRequest) {
        return res.json({
            success: false,
            message: "No Connection Request Found"
        })
    }

    connectionRequest.status = status

    const data = await connectionRequest.save()

    res.json({
        success: true,
        message: "Connection Request" + status,
        data
    })


  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error in Sending Request",
      error: error.message,
    });

  }
};


export const viewAllRequests = async (req, res) =>{
    try {
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate(["toUserId", "fromUserId"], ["firstName", "lastName", "photoUrl", "gender", "age", "skills"])
        // }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "gender", "age", "skills"])
        
       

        if (connectionRequest.length == 0) {
            return res.json({
                success: true,
                message: "No Request Avalible"
            })
        }

        res.json({
            success: true,
            message: connectionRequest
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Cannot View the Requests: "+ error.message
        })
    }
}

export const viewAllConnections = async(req, res) =>{

    try {
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequest.find({
            $or: [
               {toUserId: loggedInUser._id , status: "accepted"},
               {fromUserId: loggedInUser._id , status: "accepted"}
            ]
        }).populate(["toUserId", "fromUserId"],  ["firstName", "lastName", "photoUrl", "gender", "age", "skills"])

        // Filtering only fromUserId Data
        const data = connectionRequest.map((row)=> row.fromUserId)

        res.json({data: data})
        
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Error Viewing All Connections"
        })
    }

}

export const viewFeed = async(req, res) =>{

  try {
    
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Cannot Get User Feed: " + error.message
    })
  }

}