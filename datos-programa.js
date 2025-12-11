
 document.addEventListener("DOMContentLoaded", function () {
  const rawData = `[{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Ciudad de México","periodo":"Trimestral Sep - Dic de 2025","programaClave":"MAF24","periodoClave":"202524","sedeClave":"ASF","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Monterrey","periodo":"Trimestral Sep - Dic de 2025","programaClave":"MAF24","periodoClave":"202524","sedeClave":"AMT","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Online","periodo":"Trimestral Sep - Dic de 2025","programaClave":"MAF24L","periodoClave":"202524","sedeClave":"EDG","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Online","periodo":"Trimestral Sep - Dic de 2026","programaClave":"MAF24L","periodoClave":"202624","sedeClave":"EDG","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Online","periodo":"Trimestral Abr - Jul de 2026","programaClave":"MAF24L","periodoClave":"202622","sedeClave":"EDG","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Monterrey","periodo":"Trimestral Abr - Jul de 2026","programaClave":"MAF24","periodoClave":"202622","sedeClave":"AMT","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Monterrey","periodo":"Trimestral Sep - Dic de 2026","programaClave":"MAF24","periodoClave":"202624","sedeClave":"AMT","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Ciudad de México","periodo":"Trimestral Abr - Jul de 2026","programaClave":"MAF24","periodoClave":"202622","sedeClave":"ASF","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Ciudad de México","periodo":"Trimestral Sep - Dic de 2026","programaClave":"MAF24","periodoClave":"202624","sedeClave":"ASF","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Online","periodo":"Trimestral Abr - Jul de 2027","programaClave":"MAF24L","periodoClave":"202722","sedeClave":"EDG","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Online","periodo":"Trimestral Sep - Dic de 2027","programaClave":"MAF24L","periodoClave":"202724","sedeClave":"EDG","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Monterrey","periodo":"Trimestral Abr - Jul de 2027","programaClave":"MAF24","periodoClave":"202722","sedeClave":"AMT","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Monterrey","periodo":"Trimestral Sep - Dic de 2027","programaClave":"MAF24","periodoClave":"202724","sedeClave":"AMT","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Ciudad de México","periodo":"Trimestral Abr - Jul de 2027","programaClave":"MAF24","periodoClave":"202722","sedeClave":"ASF","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Ciudad de México","periodo":"Trimestral Sep - Dic de 2027","programaClave":"MAF24","periodoClave":"202724","sedeClave":"ASF","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Online","periodo":"Trimestral Abr - Jul de 2028","programaClave":"MAF24L","periodoClave":"202822","sedeClave":"EDG","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Online","periodo":"Trimestral Sep - Dic de 2028","programaClave":"MAF24L","periodoClave":"202824","sedeClave":"EDG","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Monterrey","periodo":"Trimestral Abr - Jul de 2028","programaClave":"MAF24","periodoClave":"202822","sedeClave":"AMT","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Monterrey","periodo":"Trimestral Sep - Dic de 2028","programaClave":"MAF24","periodoClave":"202824","sedeClave":"AMT","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Ciudad de México","periodo":"Trimestral Abr - Jul de 2028","programaClave":"MAF24","periodoClave":"202822","sedeClave":"ASF","agrupacionClave":"EGD-M"},{"rango":"1950-2022","programa":"Maestría en Finanzas","sede":"Ciudad de México","periodo":"Trimestral Sep - Dic de 2028","programaClave":"MAF24","periodoClave":"202824","sedeClave":"ASF","agrupacionClave":"EGD-M"}]`;

  let data = [];
  try {
    data = JSON.parse(rawData); //  ya viene solo MAF por el filtro de AMPscript
  } catch (e) {
    console.error("Error al procesar los datos:", e);
    return;
  }

  const yearInput = document.getElementById("anios_profesional");

// oculto en HTML no se solicita para que lo seleccionen, si no por default
  const programaSelect = document.getElementById("programa"); 
  const sedeSelect = document.getElementById("sede");
  const periodoSelect = document.getElementById("periodo");
  const mensajeDiv = document.getElementById("mensaje");
  const modalidadInput = document.getElementById("modalidad");

  // Mapea TODOS los campos usando Periodo + Sede

  function mapearPorPeriodoYSede() {
    const selectedPeriodo = periodoSelect.value;
    const selectedSede = sedeSelect.value;
    if (!selectedPeriodo || !selectedSede) return;

    // Tomamos el pool del periodo ya guardado en dataset (solo MAF)
    const pool = JSON.parse(programaSelect.dataset.programas || "[]");

    // Match final por Periodo + Sede (MAF ya garantizado)
    const resultado = pool.find(item =>
      item.periodo === selectedPeriodo &&
      item.sede === selectedSede
    );

    if (resultado) {
      // Seteamos el nombre del programa en el select oculto
      programaSelect.value = resultado.programa || "";

      // Premapeo de claves
      document.getElementById("programaClave").value = resultado.programaClave || "";
      document.getElementById("periodoClave").value = resultado.periodoClave || "";
      document.getElementById("sedeClave").value = resultado.sedeClave || "";
      document.getElementById("agrupacionClave").value = resultado.agrupacionClave || "";

      // Modalidad: L = online, P = presencial
      modalidadInput.value = selectedSede.toLowerCase().includes("online") ? "L" : "P";
    } else {
      // Reset si no hay match válido
      programaSelect.value = "";
      document.getElementById("programaClave").value = "";
      document.getElementById("periodoClave").value = "";
      document.getElementById("sedeClave").value = "";
      document.getElementById("agrupacionClave").value = "";
      modalidadInput.value = "";
    }
  }

  // Año - llena Periodos (deja dataset general del rango) 
  yearInput.addEventListener("input", function () {
    const year = parseInt(this.value);
    periodoSelect.innerHTML = '<option value="">Seleccione un periodo</option>';
    programaSelect.innerHTML = '<option value="">Seleccione una opción</option>';
    sedeSelect.innerHTML = '<option value="">Seleccione una opción</option>';
    mensajeDiv && (mensajeDiv.textContent = "");

    if (this.value.length !== 4 || isNaN(year)) {
      if (mensajeDiv) mensajeDiv.textContent = "Ingrese un año válido de 4 dígitos.";
      periodoSelect.disabled = true;
      return;
    }

    // Filtrado por rango del campo Comentarios
    const programasFiltrados = data.filter(item => {
      const rango = item.rango;
      if (rango === "1950-2022" && year >= 1950 && year <= 2022) return true;
      if (rango === "2023-2027" && year >= 2023 && year <= 2027) return true;
      if (rango === ">=2025" && year >= 2025) return true;
      return false;
    });

    const periodosUnicos = [];
    const nombresVistos = new Set();
    programasFiltrados.forEach(item => {
      if (!nombresVistos.has(item.periodo)) {
        nombresVistos.add(item.periodo);
        periodosUnicos.push(item.periodo);
      }
    });

    if (periodosUnicos.length === 0) {
      if (mensajeDiv) mensajeDiv.textContent = "No hay periodos disponibles para el año ingresado.Debe ser menor o igual a 2022";
      periodoSelect.disabled = true;
      return;
    }

    periodoSelect.disabled = false;
    periodosUnicos.forEach(nombre => {
      const option = document.createElement("option");
      option.value = nombre;
      option.textContent = nombre;
      periodoSelect.appendChild(option);
    });

    // Guardamos TODO el pool del rango en el dataset del periodo
    // aunque ya viene solo MAF, se mantiene la estructura
    periodoSelect.dataset.programas = JSON.stringify(programasFiltrados);
  });

  //  Periodo - llena Sedes SOLO de MAF y guarda dataset del periodo (MAF) 
  periodoSelect.addEventListener("change", function () {
    const selectedPeriodo = this.value;
    const programasDelRango = JSON.parse(this.dataset.programas || "[]");

    // Del rango, tomar solo MAF del periodo seleccionado
    const mmtDelPeriodo = programasDelRango.filter(item =>
      item.periodo === selectedPeriodo && (item.programaClave || "").indexOf("MAF") >= 0
    );

    // Poblar sedes únicas
    const sedesUnicas = [...new Set(mmtDelPeriodo.map(item => item.sede))];

    sedeSelect.innerHTML = '<option value="">Seleccione una opción</option>';
    sedeSelect.disabled = false;
    sedesUnicas.forEach(nombre => {
      const option = document.createElement("option");
      option.value = nombre;
      option.textContent = nombre;
      sedeSelect.appendChild(option);
    });

    // Guardar SOLO MAF del periodo en dataset del programa (pool para el mapeo final)
    programaSelect.dataset.programas = JSON.stringify(mmtDelPeriodo);

    // Si por alguna razón ya hay sede seleccionada (prefill), intentar mapear ahora
    mapearPorPeriodoYSede();
  });

  // Sede → mapeo FINAL (Periodo + Sede) y asignación de todos los campos
  sedeSelect.addEventListener("change", function () {
    mapearPorPeriodoYSede();
  });
});
