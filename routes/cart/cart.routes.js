const express = require("express");
const res = require("express/lib/response");
const { cartList } = require("../../data/index");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send(cartList);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    let response = cartList.find((e) => e.id === +id);
    return !response
      ? res.status(400).send({ msn: "object not fund" })
      : res.send(response);
  }
});

router.post("/", (req, res) => {
  const { id, nombre, descripcion, codigo, img, precio, stock } = req.body;

  const findId = cartList.map((item) => item.id);
  let newId;
  if (findId.length == 0) newId = 1;
  else newId = Math.max.apply(null, findId) + 1;

  const newCart = {
    id: newId,
    producto: {
      id: id,
      nombre: nombre,
      descripcion: descripcion,
      código: codigo,
      img: img,
      precio: precio,
      stock: stock,
    },
  };

  cartList.push(newCart);

  res.status(200).send("Cartlist its upload");
});

router.put("/:id", (req, res) => {
  const {
    params: { id },
    body: { nombre, descripcion, codigo, img, precio, stock },
  } = req;

  if (!id) {
    res.status(400).res.send("id not found");
  }
  const cartIndex = cartList.findIndex((e) => e.id === +id) + 1; // para que me funcionara, tuve que sumar y 1 aqui.
  console.log(cartIndex);
  if (!cartIndex)
    return res
      .status(404)
      .json({ success: false, error: "carrito no encontrado" });
  const newCart = {
    ...cartList[cartIndex],
    producto: {
      nombre: nombre,
      descripcion: descripcion,
      código: codigo,
      img: img,
      precio: precio,
      stock: stock,
    },
  };
  cartList[cartIndex - 1] = newCart; // y restar 1 aqui.
  return res.status(200).json({ succes: true, result: newCart });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send("Id not found");

  const cartIndex = cartList.findIndex((e) => e.id === +id) + 1;

  if (!cartIndex)
    return res.status(402).json({ success: false, error: "Invalid id" });

  cartList.splice(cartIndex - 1, 1);

  return res.status(200).send("carrito eliminado correctamente");
});

module.exports = router;
