import { Schema as _Schema, model } from 'mongoose';
const Schema=_Schema;
const userSchema=new Schema({
    username:{type:String,required:true,unique:true,minlength:3},
    password:{type:String,required:true}
});
const User=model('User',userSchema);

export default User; 