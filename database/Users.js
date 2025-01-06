const User = require("./Schema/User.js");

const save_user = async ({ id, user_name, first_name }) => {
  try {
    let findUser = await User.findOne({ user_id: id });
    if (findUser) return { success: false, message: "User already exists" };
    let user = new User({ user_id:id, user_name, first_name });
    let saveUser = await user.save();
    if (saveUser) return { success: true, user: saveUser };
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
};

module.exports = { save_user };
