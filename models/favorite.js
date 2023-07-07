import { Schema, model, models} from 'mongoose';

const FavoriteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipe:{
        type: String,
        
    },
});

const Favorite = models.Favorite || model("Favorite", FavoriteSchema);

export default Favorite;


