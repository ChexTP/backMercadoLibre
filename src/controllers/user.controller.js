import User from '../models/user.model.js'

export const getAllUsers = async (req,res) => {

    try {
        
        const users = await User.find({}).select('-password')

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: 'An error occurred get the users', error: error.message });
    }

}

export const getUserById = async (req,res) => {

    const {idUser}=req.body

    try {
        
        const user = await User.findById(idUser).select('-password')

        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({ message: 'An error occurred get the user by id', error: error.message });
    }
}

export const updateUserById = async (req, res) => {
    const { idUser, name, document, email, birthday, gender, phone } = req.body;

    const image = req.file ? req.file.path : null;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            idUser,
            {
                name,
                document,
                email,
                birthday,
                gender,
                phone,
                image
            },
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the user', error: error.message });
    }
};


export const deleteUserById = async (req, res) => {
    const { idUser } = req.body;

    try {
        const deletedUser = await User.findByIdAndDelete(idUser);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User delete correctly' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the user', error: error.message });
    }
};
