module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        email: String,
        password: String,
        confirmed: Boolean
      },
      { timestamps: true }
    )
  );

  return User;
};