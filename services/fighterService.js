import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighter(id) {
    const fighter = this.search({ id });
    if (!fighter) {
      throw Error("Fighter not found");
    }
    return fighter;
  }

  createFighter(fighterData) {
    const { name } = fighterData;

    const nameExists = this.search({ name });

    if (nameExists) {
      throw Error(`A fighter with this name already exists`);
    }
    return fighterRepository.create(fighterData);
  }

  updateFighter(id, dataToUpdate) {
    const result = this.search({ id });
    if (!result) {
      throw Error("Fighter not update");
    }
    return fighterRepository.update(id, dataToUpdate);
  }

  deleteFighter(id) {
    const user = fighterRepository.delete(id);
    if (!user.length) {
      throw Error("Fighter not delete");
    }
    return user;
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
