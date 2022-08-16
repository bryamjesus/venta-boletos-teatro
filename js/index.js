const boleta = document.getElementById("boleta");
const selectObra = document.getElementById("selectObra");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtAge = document.getElementById("txtAge");
const rbEstudiante = document.getElementsByName("estudiante");
const chboxTarjeta = document.getElementById("chboxTarjeta");
const btnCalcular = document.getElementById("calcular");

window.addEventListener("click", () => validar());

window.addEventListener("keyup", () => validar());

const calcularPrecio = () => {
  botonCalcular(true);
  mostrarDatos();
  mostrarPrecio();
};

const mostrarDatos = () => {
  const div = document.createElement("div");
  const factura = document.getElementById("factura");

  if (factura) {
    boleta.removeChild(factura);
    div.id = "factura";
    div.innerHTML = precioFactura();
  } else {
    div.id = "factura";
    div.innerHTML = precioFactura();
  }

  boleta.appendChild(div);
};

const mostrarPrecio = () => {
  const div = document.createElement("div");
  const precio = document.getElementById("precio");

  if (precio) {
    boleta.removeChild(precio);
    div.id = "precio";
    div.innerHTML = precioTexto();
  } else {
    div.id = "precio";
    div.innerHTML = precioTexto();
  }

  boleta.appendChild(div);
};

const pagar = () => {
  const precio = document.getElementById("precio");
  const factura = document.getElementById("factura");
  boleta.removeChild(precio);
  boleta.removeChild(factura);
  limpiar();
  botonCalcular(false);
};

const eliminar = () => pagar();

const precioFactura = () => {
  return `
  <h4 class="pb-3 m-0">Factura</h4>
  <div class="row g-3">
    <div class="row mb-2 px-5">
      <h5 class="col-sm-2">Obra</h5>
      <div class="col-sm-10">
        <p>${selectObra.value}</p>
      </div>
    </div>
    <div class="row mb-2 px-5">
      <h5 class="col-sm-2">Nombre</h5>
      <div class="col-sm-10">
        <p>${txtNombre.value} ${txtApellido.value}</p>
      </div>
    </div>

    <div class="row px-5">
      <div class="col-sm">
        <h5 class="form-label">Edad:</h5>
        <p>${txtAge.value}</p>
      </div>
      <div class="col-sm">
        <h5 class="form-label">Estudiante:</h5>
        <p>${rptaEstudiante()}</p>
      </div>
      <div class="col-sm">
        <h5 for="inputZip" class="form-label">
          Pago con tarjeta de crédito:
        </h5>
        <p>${rptaCheckBox(chboxTarjeta)}</p>
      </div>
    </div>
  </div>`;
};

const precioTexto = () => {
  return `
  <h4 class="pb-3 pt-2 m-0">Precio</h4>
  <div class="px-5">
    <p><strong>Boleto: </strong> S/. ${precio()}</p>
    <p><strong>Descuento(10%): </strong>${descuento() === 0 ? "-" : descuento()
    }</p>
    <p class = "bg-info p-2"><strong>Total: S/. ${precioFinal()}</strong></p>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button onclick="pagar()" class="btn btn-outline-success" type="button">
        <i class="bi bi-cash-stack"></i> Pagar
      </button>
      <button onclick="eliminar()" class="btn btn-outline-danger" type="button">
        <i class="bi bi-trash3-fill"></i> Eliminar
      </button>
    </div>
  </div>`;
};

const precio = () => {
  const estudiante = rptaEstudiante() === "Si" ? true : false;
  return txtAge.value < 12 || estudiante ? 7 : 18;
};

const descuento = () =>
  chboxTarjeta.checked ? 0 : (precio() * 0.1).toFixed(2);

const precioFinal = () => precio() - descuento();

const validar = () =>
  selectObra.value && txtNombre.value && txtApellido.value && txtAge.value
    ? (btnCalcular.disabled = false)
    : (btnCalcular.disabled = true);

const rptaEstudiante = () => {
  for (var radio of rbEstudiante) {
    if (radio.checked) {
      return radio.value;
    }
  }
};

const rptaCheckBox = (checkboxValidar) =>
  checkboxValidar.checked ? "Si" : "No";

const botonCalcular = (tocado) =>
  (btnCalcular.textContent = tocado ? "Volver a calular" : "Calcular");

const limpiar = () => {
  txtNombre.value = "";
  txtApellido.value = "";
  txtAge.value = "";
  chboxTarjeta.checked = false;
  selectObra.selectedIndex = 0;
  rbEstudiante[0].checked = true;
  txtNombre.focus();
};