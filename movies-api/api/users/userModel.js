import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

// Password validation regex
const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: {
      type: String,
      required: true,
      validate: {
          validator: function (v) {
              return passwordValidator.test(v);
          },
          message: props => `${props.value} is not a valid password! Password must be 8-128 characters long, include one letter, one number, and one special character.`
      }
  }
});

UserSchema.methods.comparePassword = async function (passw) { 
  try {
      return await bcrypt.compare(passw, this.password); 
  } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
  }
}
  
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username: username });
}

  

  UserSchema.pre('save', async function(next) {
    const saltRounds = 12; // Increased salt rounds for enhanced security
    if (this.isModified('password') || this.isNew) {
        try {
            const hash = await bcrypt.hash(this.password, saltRounds);
            this.password = hash;
            next();
        } catch (error) {
            console.error('Error hashing password:', error);
            next(error);
        }
    } else {
        next();
    }
});

export default mongoose.model('User', UserSchema);
