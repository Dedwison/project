const express = require("express");
const res = require("express/lib/response");
const { productsList } = require("../../data/index");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send(productsList);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    let response = productsList.find((e) => e.id === +id);
    return !response
      ? res.status(400).send({ msn: "object not fund" })
      : res.send(response);
  }
});

router.post("/", (req, res) => {
  const { name, description, price, img, cod, stock } = req.body;

  const findId = productsList.map((item) => item.id);
  let newId;
  if (findId.length == 0) newId = 1;
  else newId = Math.max.apply(null, findId) + 1;

  const newProduct = {
    id: newId,
    name: name,
    description: description,
    price: price,
    img: img,
    cod: cod,
    stock: stock,
  };

  productsList.push(newProduct);

  res.status(200).send("the product its upload");
});

router.put("/:id", (req, res) => {
  const {
    params: { id },
    body: { name, price, img, stock, cod },
  } = req;

  if (!id) {
    res.status(400).res.send("id not found");
  }
  const productIndex = productsList.findIndex((e) => e.id === +id) + 1; // para que me funcionara, tuve que sumar y 1 aqui.
  console.log(productIndex);
  if (!productIndex)
    return res
      .status(404)
      .json({ success: false, error: "producto no encontrado" });
  const newProduct = {
    ...productsList[productIndex],
    name,
    price,
    img,
    stock,
    cod,
  };
  productsList[productIndex - 1] = newProduct; // y restar 1 aqui.
  return res.status(200).json({ succes: true, result: newProduct });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send("Id not found");

  const productIndex = productsList.findIndex((e) => e.id === +id) + 1;

  if (!productIndex)
    return res.status(402).json({ success: false, error: "Invalid id" });

  productsList.splice(productIndex - 1, 1);

  return res.status(200).send("eliminado correctamente");
});

module.exports = router;
