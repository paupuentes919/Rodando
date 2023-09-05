// const db = require('../database/models');
// const fs = require("fs");

// const User = {
//   fileName: "src/database/usuarios.json",

//   //Traigo todos los usuarios de la BD 

//   traerUsuariosBD: function(){

//     db.usuario.findAll({
//       include: [{association: 'sucursal'}]
//     })
//       .then(function(users){
//         console.log(users)
//       })
//   },

//   traerUsuarios: function () {
//     return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
//   },

//   //Encuentro usuario por PK y Campo de la BD
//   encontrarUsuarioPorPKBD: function () {
//     db.usuario.findByPk(req.params.id, {
//       include: [{association: 'sucursal'}]
//     })
//     .then(function(userPk){
//       if (userPk) {
//       res.render("perfilUsuario", { userPk});
//       }
//       else { res.redirect('/') }
//     })     
//   },
//   // encontrarUsuarioPorPK: function (id) {
//   //   let todosLosUsuarios = this.traerUsuarios();
//   //   let usuarioPK = todosLosUsuarios.find((user) => user.id == id);
//   //   return usuarioPK;
//   // },

//   encontrarUsuarioPorCampoBD: function (campoFormulario) {
//     db.usuario.findOne( {
//       where:{
//         email: campoFormulario
//       },
//     }).then(function(usuarioCampo){
//       console.log("eeeeeeeeeeee", usuarioCampo);
//       return usuarioCampo;
//     })
//   },
//   encontrarUsuarioPorCampo: function (campo, campoFormulario) {
//     let todosLosUsuarios = this.traerUsuarios();
//     let usuarioCampo = todosLosUsuarios.find(
//       (user) => user[campo] === campoFormulario,
//     );
//     return usuarioCampo;
//   },

//   generarId: function(){
//     let todosLosUsuarios = this.traerUsuarios();
//     let ultimoUsuario = todosLosUsuarios.pop();
//     if(ultimoUsuario){  
//       return ultimoUsuario.id + 1;
//     }else{ return 1 }  
//   },

//   //Creo usuario en la bd
//   crearUsuarioEnBD: function (datosUsuario) {
//     let todosLosUsuarios = this.traerUsuarios();
//     let usuarioNuevo = {
//       id: this.generarId(), 
//       ...datosUsuario,
//     };
//     todosLosUsuarios.push(usuarioNuevo);
//     fs.writeFileSync(this.fileName,JSON.stringify(todosLosUsuarios, null, " "));
//     return usuarioNuevo;
//   },

//   // Borro usuario de la bd// ESTE NO FUNCIONA!!! SOLUCIONARLO
//   borrarUsuarioDeBD: function (id) {
//     let todosLosUsuarios = this.traerUsuarios();
//     let usuariosNoBorrados = todosLosUsuarios.filter((user) => {
//       user.id !== id;
//     });
//     fs.writeFileSync(
//       this.fileName,
//       JSON.stringify(usuariosNoBorrados, null, " "),
//     );
//     return usuariosNoBorrados;
//   },
// };


// // console.log(User.traerUsuariosBD());
// // console.log(User.encontrarUsuarioPorPKBD());
// // console.log(User.encontrarUsuarioPorCampoBD("tomygomien@gmail.com"));

// module.exports = User;
