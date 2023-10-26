const selectPagado = document.querySelector("#selectPagado");

selectPagado.addEventListener("change", async () => {
  const estadoInicial = selectPagado.value === "si" ? "no" : "si";
  if (
    confirm("Esta seguro que desea cambiar el estado de pago de este alquiler?")
  ) {
    selectPagado.value = estadoInicial === "si" ? "no" : "si";
    await axios.put(document.location.pathname, {
      pagado: selectPagado.value,
    });
    return;
  }
  selectPagado.value = estadoInicial;
});
