const Seqeuelize = require("sequelize");
const sequelize = new Seqeuelize("postgres://localhost/cpu_parts_db");

//model creation
const Cpu = sequelize.define("cpus", {
  name: {
    type: Seqeuelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Seqeuelize.INTEGER,
    allowNull: false,
  },
  benchmark: {
    type: Seqeuelize.INTEGER,
    allowNull: false,
  },
});

const Gpu = sequelize.define("gpus", {
  name: {
    type: Seqeuelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Seqeuelize.INTEGER,
    allowNull: false,
  },
  benchmark: {
    type: Seqeuelize.INTEGER,
    allowNull: false,
  },
});

const MotherBoard = sequelize.define("motherboards", {
  name: {
    type: Seqeuelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Seqeuelize.INTEGER,
    allowNull: false,
  },
});

//express
const express = require("express");
const app = express();
const path = require("path");

//app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/cpus", async (req, res, next) => {
  try {
    res.send(await Cpu.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/gpus", async (req, res, next) => {
  try {
    res.send(await Gpu.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/motherboards", async (req, res, next) => {
  try {
    res.send(await MotherBoard.findAll());
  } catch (ex) {
    next(ex);
  }
});

//sync and seed

const init = async () => {
  await sequelize.sync({ force: true });
  console.log("syncd");
  //seeding
  await Cpu.create({ name: "AMD Ryzen 5 5600x", price: 299, benchmark: 800 });
  await Cpu.create({ name: "Intel Core i9", price: 589, benchmark: 950 });
  await Cpu.create({ name: "Intel Core i7", price: 409, benchmark: 825 });
  await Gpu.create({
    name: "Nvidia GeForce RTX 3080",
    price: 699,
    benchmark: 1025,
  });
  await Gpu.create({
    name: "AMD Radeon RX 6800 XT",
    price: 649,
    benchmark: 925,
  });
  await Gpu.create({
    name: "Nvidia GeForce RTX 3070",
    price: 499,
    benchmark: 885,
  });
  await MotherBoard.create({ name: "MSI Meg Z490", price: 219 });
  await MotherBoard.create({ name: "ROX Maximus XIII Hero", price: 319 });
  await MotherBoard.create({ name: "GIGABYTE B450", price: 189 });
  //port and listen
  const port = 2345;
  app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
  });
};

init();
