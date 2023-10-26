const ShortUniqueId = require("short-unique-id");
const db = require("../database/models");
const nodemailer = require("nodemailer");

const getFechaArgentina = (fecha) =>
  new Date(fecha).toLocaleDateString("es-ES");

const alquilerController = {
  mostrarAlquileres: async (req, res) => {
    db.alquiler
      .findAll()
      .then((resultadoAlquileres) => {
        const alquileresConFecha = resultadoAlquileres.map((alquiler) => ({
          ...alquiler.dataValues,
          fecha_emision_alquiler: getFechaArgentina(
            alquiler.dataValues.fecha_emision_alquiler,
          ),
        }));

        res.render("alquileres", { alquileres: alquileresConFecha });
      })
      .catch((error) => {
        res.json({ message: "Ocurrio un error", error });
      });
  },

  mostrarAlquilerById: async (req, res) => {
    try {
      const alquiler = await db.alquiler.findByPk(req.params.id);
      if (!alquiler) return res.sendStatus(404);

      const detalles = await db.rodado_alquiler.findAll({
        includes: [{ association: "rodado" }],
        where: { alquiler_id: req.params.id },
      });

      const rodados = await db.rodado.findAll();

      let detallesConDatos = detalles.map((detalle) => ({
        ...detalle.dataValues,
        rodado: rodados.find(
          (rodado) => rodado.dataValues.id === detalle.dataValues.rodado_id,
        ),
      }));

      const alquilerConFecha = {
        ...alquiler.dataValues,
        fecha_emision_alquiler: getFechaArgentina(
          alquiler.dataValues.fecha_emision_alquiler,
        ),
      };

      // return res.json({
      //   alquiler: alquilerConFecha,
      //   detalles: detallesConDatos,
      // });
      return res.render("alquiler", {
        alquiler: alquilerConFecha,
        detalles: detallesConDatos,
      });
    } catch (error) {
      res.json({ message: "Ocurrio un error", error });
    }
  },

  postAlquiler: async (req, res) => {
    const { nombre, apellido, telefono, email, carrito } = req.body;
    const uid = new ShortUniqueId({ length: 10 });

    try {
      const alquiler = await db.alquiler.create({
        codigo_reserva: uid.rnd(),
        fecha_emision_alquiler: new Date(),
        nombre,
        apellido,
        telefono,
        email,
      });

      carrito.forEach(async (rodado) => {
        await db.rodado_alquiler.create({
          rodado_id: rodado.id,
          alquiler_id: alquiler.id,
          cantidad_rodados: rodado.cantidadRodado,
          cantidad_horas: rodado.cantidadHoras,
          precio_hora: rodado.precioUnitario,
        });
      });

      // GET del alquiler recien creado
      // const rodados = await db.rodado.findAll();

      // detalles = carrito.map((detalle) => ({
      //   ...detalle,
      //   rodado: rodados.find((rodado) => rodado.dataValues.id === detalle.id),
      // }));
      // console.log({ detalles });

      // Envio del email con los datos de la reserva
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: "rodandodh@gmail.com",
          pass: "bomw mbaj tmuq layr",
        },
      });

      const mailData = {
        from: "Rodando Alquileres rodandodh@gmail.com",
        to: email,
        subject: "Tu proximo alquiler - Rodando",
        html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
            <body>
              <h1 class="text-center my-5">Rodando te espera!</h1>
              <p class="text-center mb-4">
                Querido/a ${nombre} ${apellido} aquí están los datos de
                tu reserva:
              </p>
              <main>
                <div
                  style="background-color: rgba(251, 251, 246, 0.5);"
                  class="mx-5 mt-4 p-4"
                >
                  <div class="text-center">
                    <h1 style="color: #df4249;">
                      <b>Alquiler: ${alquiler.dataValues.codigo_reserva}</b>
                    </h1>
                  </div>
        
                  <div class="d-flex justify-content-center">
                    <div
                      class="p-4 d-flex justify-content-center flex-column"
                      style="width: 70%"
                    >
                      <div class="d-flex gap-4">
                        <p style="flex-basis: 50%;">
                          <b>Fecha emision alquiler:</b> ${getFechaArgentina(
                            alquiler.dataValues.fecha_emision_alquiler,
                          )}
                        </p>
        
                        <p style="flex-basis: 50%;">
                          <b>Telefono:</b> ${telefono}
                        </p>
                      </div>
        
                      <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-end align-self-end">
                          <h2 class="m-0" style="color: #333;">
                            Total: $
                            ${carrito
                              .reduce((acc, count) => {
                                acc += Number(count.precioTotal);
                                return acc;
                              }, 0)
                              .toLocaleString("es-AR")}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container d-flex justify-content-center">
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr);">
                    ${carrito.map(
                      (detalle) =>
                        `<article class="d-flex flex-column" style="border-radius: 5px;">
                        <div class="mb-2 article-fields">
                          <div class="user-title-box">
                            <h4 style="color: #df4249;">
                              <b>${detalle.tituloRodado}</b>
                            </h4>
                          </div>
                          <div class="d-flex justify-content-center my-4">
                            <img
                              height="150"
                              src="${detalle.imagen}"
                              alt="${detalle.tituloRodado}"
                            />
                          </div>
                          <div>
                            <p>
                              <b>Precio por hora:</b> $${Number(
                                detalle.precioUnitario,
                              ).toLocaleString("es-AR")}
                            </p>
                          </div>
                          <div>
                            <p>
                              <b>Cantidad de horas:</b> ${detalle.cantidadHoras}
                            </p>
                          </div>
                          <div>
                            <p>
                              <b>Cantidad de rodados:</b> ${
                                detalle.cantidadRodado
                              }
                            </p>
                          </div>
                          <div>
                            <h3>
                              Total: $
                              ${Number(detalle.precioTotal).toLocaleString(
                                "es-AR",
                              )}
                            </h3>
                          </div>
                        </div>
                      </article>`,
                    )}
                  </div>
                </div>
              </main>
            </body>
          </html>`,
      };

      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: err.message });
        }
        return {
          message: "Mail sent successful",
          messageId: info.messageId,
        };
      });

      return res.status(201).json({ carrito, alquiler });
    } catch (error) {
      return res.json({ message: "Ocurrio un error", error });
    }
  },

  editAlquiler: async (req, res) => {
    try {
      const alquilerById = await db.alquiler.findByPk(req.params.id);
      if (!alquilerById) return res.sendStatus(404);

      await db.alquiler.update(req.body, {
        where: { id: req.params.id },
      });

      res.json({
        message: `Alquiler ${req.params.id} editado exitosamente`,
      });
    } catch (error) {
      res.json({ message: "Ocurrio un error", error });
    }
  },

  deleteAlquiler: async (req, res) => {
    try {
      let alquiler = await db.alquiler.findOne({
        where: { id: req.params.id },
      });
      if (!alquiler) {
        return res.sendStatus(404);
      }
      await db.rodado_alquiler.destroy({
        where: { alquiler_id: req.params.id },
      });
      await db.alquiler.destroy({ where: { id: req.params.id } });
      res.json({ message: "Recurso borrado exitosamente" });
    } catch (error) {
      res.json({ message: "Ocurrio un error", error });
    }
  },
};

module.exports = { alquilerController };
