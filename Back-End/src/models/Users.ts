import mongoose, { Schema, Document} from "mongoose";
import { hashPassword, comparePassword } from "../util/bcypt";

export interface IExeprience {
    title: string;
    company: string;
    location?: string;
    startDate: Date;
    endDate: Date;
    description?: string;
}

export interface IUser extends Document {
    fullName: string;
    password: string;
    email: string;
    profilePicture?: string;
    bio?: string;
    experience?: IExeprience[];
    createdAt: Date;
    updatedAt: Date;
}

const ExpericeSchema: Schema = new Schema<IExeprience>(
    {
        title: { type: String, required: true},
        company: { type: String, required: true},
        location: String,
        startDate: {type: Date, required: true},
        endDate: Date,
        description: String,
    },
    { _id: false }
);

const UserSchema = new Schema<IUser>(
    {
        fullName: { type: String, required: true},
        password: { type: String, required: true},
        email: { type: String, required: true},
        profilePicture: { type: String, default: ""},
        bio: { type: String},
        experience: [ExpericeSchema]
    },
    { timestamps: true }
);


UserSchema.pre("save", async function (next) {
    const user = this as IUser;
    if(!user.isModified("passwrod")){
        return next();
    };

    try {
        user.password = await hashPassword(user.password);
        next();
    } catch (error: any) {
        next(error);
    }
});

UserSchema.methods.comparedPassword = function (candidatePassword: string): Promise<boolean> {
    return comparePassword(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;