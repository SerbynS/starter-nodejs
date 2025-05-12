import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  getAll() {
    return userRepository.getAll();
  }

  getUser(id) {
    const user = this.search({ id });
    if (!user) {
      throw Error("User not found");
    }
    return user;
  }

  createUser(userData) {
    const { email, phone } = userData;

    const emailExists = this.search({ email });
    const phoneExists = this.search({ phone });

    if (emailExists || phoneExists) {
      const field = emailExists ? "email" : "phone";
      throw Error(`A user with this ${field} already exists`);
    }
    return userRepository.create(userData);
  }

  updateUser(id, dataToUpdate) {
    const result = this.search({ id });

    if (!result) {
      throw Error("User not found");
    }
    return userRepository.update(id, dataToUpdate);
  }

  deleteUser(id) {
    const user = userRepository.delete(id);
    if (!user.length) {
      throw Error("User not found");
    }
    return user;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
