import crypto from 'crypto'


export const login = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}