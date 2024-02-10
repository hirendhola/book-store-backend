import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishDate: {
            type: Date,
            required: function () { return this.published; }
        },        
        categories: {  
            type: String,
            required: true
        },
        published: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);



export const Book = mongoose.model('Book', bookSchema);