const form = document.getElementById('formPago');
const lista = document.getElementById('historialPagos');
const cargarPagos = () => {
    const pagos = JSON.parse(localStorage.getItem('pagos')) || [];
    lista.innerHTML = '';
    pagos.forEach((pago, index) => {
        const li = document.createElement('li');
        li.textContent = `${pago.fecha}: $${pago.monto} - ${pago.tipo} - ${pago.descripcion}`;
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarPago(index);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
};
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const monto = parseFloat(document.getElementById('monto').value);
      const tipo = document.getElementById('tipo').value;
      const descripcion = document.getElementById('descripcion').value;
      const fecha = document.getElementById('fecha').value;

      const nuevoPago = { monto, tipo, descripcion, fecha };
      const pagos = JSON.parse(localStorage.getItem('pagos')) || [];
      pagos.push(nuevoPago);
      localStorage.setItem('pagos', JSON.stringify(pagos));
      form.reset();
      cargarPagos();
    });
    document.addEventListener('DOMContentLoaded', cargarPagos);

