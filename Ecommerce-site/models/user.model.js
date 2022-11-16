const { post } = require("../routes/auth.routes");

const mongodb = require("mongodb");

const bcrypt = require("bcryptjs"); //third party package for encrypting the
//password

const db = require("../data/database");
const { GridFSBucket } = require("mongodb");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  static findById(userId) {
    const uid = new mongodb.ObjectId(userId); //Converting userId to Object Id by using the mongodb.ObjectId()

    return db
      .getDb()
      .collection("users")
      .findOne(
        { _id: uid },
        {
          projection: {password: 0},
        }
      );
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({
      email: this.email,
    });
  }

  async exitsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
