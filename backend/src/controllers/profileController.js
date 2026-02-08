

export const getProfileController = async(req, res) =>{
    try {
        const user = req.user

        if (!user) {
            return res.status(500).json({ message: "User missing" });
        }

        res.json({
            success: true,
            message: "User Found Successfully",
            data: user
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}