const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");

function createToken (res) {
  return jwt.sign(
    {
      id: res.id,
      email: res.email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async login(_, {email, password}) {
      const foundUser = await User.findOne({ email });
      if(!foundUser){
        throw new UserInputError('Please Enter Valid Credentials', {
          errors: {
            email: 'Please Enter Valid Credentials'
          }
        })
      }

      const match = await bcrypt.compare(password, foundUser.password)

    if (!match) {
      throw new UserInputError('Please Enter Valid Credentials', {
        errors: {
          password: 'Please Enter Valid Credentials'
        }
      })
    }

    const token = createToken(foundUser);


    return {
      ...foundUser.doc,
      id: foundUser.id,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
      token,
    };
    }
  },
  Mutation: {
    async register(
      _,
      {
        registerInput: {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          mobile,
          address,
        },
      },
      context,
      info
    ) {
      const registeredUser = await User.findOne({ email });
      if (registeredUser) {
        throw new UserInputError('email is taken', {
          errors: {
            email: 'This email is already registered'
          }
        })
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        mobile,
        address,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = createToken(res);

      return {
        ...res.doc,
        id: res.id,
        email: res.email,
        createdAt: res.createdAt,
        token,
      };
    },
  },
};
