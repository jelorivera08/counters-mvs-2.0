const mongoose = require('mongoose');

class Counter {
  constructor() {
    this.init();
    this.createCounterModel();
  }

  init = () => {
    try {
      mongoose.connect('mongodb://localhost:27017/JeloDB', {
        useNewUrlParser: true,
        useFindAndModify: false,
      });
    } catch (err) {
      console.error('unable to connect to database');
    }
  };

  createCounterModel = () => {
    const counterSchema = mongoose.Schema({ title: String, count: Number });
    this.mongoRepo = mongoose.model('Counter', counterSchema);
  };

  getAll = async () => {
    try {
      let res = await this.mongoRepo.find({}, null);
      return res;
    } catch (err) {
      throw new Error('foobar');
    }
  };

  create = async (title) => {
    try {
      await this.mongoRepo.create({
        title,
        count: 0,
      });

      return this.getAll();
    } catch (err) {
      console.error(`unable to create document:${err}`);
    }
  };

  inc = async (id) => {
    try {
      let counters = await this.getAll();
      let counterToBeIncremented;
      counters.forEach((counter) => {
        if (counter.id === id) {
          counterToBeIncremented = counter;
        }
      });

      await this.mongoRepo.findByIdAndUpdate(counterToBeIncremented.id, {
        count: counterToBeIncremented.count + 1,
      });

      let updatedCounters = await this.getAll();
      return updatedCounters;
    } catch (err) {
      console.error(`unable to increment document count:${err}`);
    }
  };

  dec = async (id) => {
    try {
      let counters = await this.getAll();
      let counterToBeIncremented;
      counters.forEach((counter) => {
        if (counter.id === id) {
          counterToBeIncremented = counter;
        }
      });

      await this.mongoRepo.findByIdAndUpdate(counterToBeIncremented.id, {
        count: counterToBeIncremented.count - 1,
      });

      let updatedCounters = await this.getAll();
      return updatedCounters;
    } catch (err) {
      console.error(`unable to increment document count:${err}`);
    }
  };

  del = async (id) => {
    try {
      await this.mongoRepo.findByIdAndRemove(id);

      let updatedCounters = await this.getAll();

      return updatedCounters;
    } catch (err) {
      console.error(`unable to delete document : ${err}`);
    }
  };
}

module.exports = Counter;
