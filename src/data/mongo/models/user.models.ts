import mongoose from "mongoose";



const userSchema = new mongoose.Schema({


    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'password is required']
    },

    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    }
});


export const User = mongoose.model('User', userSchema);