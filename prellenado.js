
    let debugging = true;

function debug(...v) {
    if (debugging) {
        console.log(...v);
    }
}

function info(...v) {
    debug('%cINFO', 'background: #000000; color: #8f7700;', ...v);
}

function warn(...v) {
    debug('%cWARN', 'background: #000000; color: #7a0000;', ...v);
}

function err(...v) {
    debug('%cERROR', 'background: #ff0000; color: #ffffff;', ...v);
}

// Función para encontrar opción en select por texto
function encontrarOpcionPorTexto(selectElement, textoBuscado) {
    if (!selectElement || !textoBuscado) return null;
    
    for (const option of selectElement.options) {
        if (option.textContent.trim().toLowerCase() === textoBuscado.toLowerCase()) {
            return option.value;
        }
    }
    return null;
}

// Función para mapear valores del formulario
function mapearValoresFormulario(rowData, programasData) {
    try {
        if (!rowData || !programasData || !Array.isArray(programasData)) {
            warn('Datos inválidos para mapeo');
            return null;
        }
        
        const coincidencia = programasData.find(item => 
            item.periodoClave === rowData.Periodo_Clave &&
            item.programaClave === rowData.Programa_ClaveBanner &&
            item.sedeClave === rowData.Sede_Clave
        );
        
        if (coincidencia) {
            info('Coincidencia encontrada:', coincidencia);
            return {
                periodo: coincidencia.periodo,
                programa: coincidencia.programa,
                sede: coincidencia.sede,
                agrupacionClave: coincidencia.agrupacionClave
            };
        } else {
            warn('No hay coincidencia para:', {
                periodoClave: rowData.Periodo_Clave,
                programaClave: rowData.Programa_ClaveBanner,
                sedeClave: rowData.Sede_Clave
            });
            return null;
        }
    } catch (e) {
        err('Error en mapearValoresFormulario:', e);
        return null;
    }
}

// Función principal de prellenado
function prellenarFormulario() {
    try {
        // Obtener el row desde Marketing Cloud
        let rowData;
        try {
            rowData = null;
            console.log('Row data from Marketing Cloud:', rowData);
            
            // Parsear si viene como string
            if (typeof rowData === 'string') {
                rowData = JSON.parse(rowData.replace(/\\/g, ''));
            }
        } catch (e) {
            err('Error al obtener/parsear row de Marketing Cloud:', e);
            rowData = {};
        }

        info('Datos del row para prellenar:', rowData);
        
        if (Object.keys(rowData).length === 0) {
            warn('No hay datos en row para prellenar');
            return;
        }
        
        // Obtener datos de programas
        let datosProgramas = [];
        try {
            if (typeof rawData !== 'undefined') {
                datosProgramas = JSON.parse(rawData);
                info('Datos de programas cargados:', datosProgramas.length, 'registros');
            } else {
                warn('rawData no está definido');
            }
        } catch (e) {
            err('Error al parsear rawData:', e);
        }
        
        // Mapear valores de periodo, programa y sede
        const valoresMapeados = mapearValoresFormulario(rowData, datosProgramas);
        
        // Prellenar campos hidden con las claves
        if (rowData.Periodo_Clave) {
            document.getElementById('periodoClave').value = rowData.Periodo_Clave;
        }
        if (rowData.Programa_ClaveBanner) {
            document.getElementById('programaClave').value = rowData.Programa_ClaveBanner;
        }
        if (rowData.Sede_Clave) {
            document.getElementById('sedeClave').value = rowData.Sede_Clave;
        }
        if (rowData.Agrupacion_Clave) {
            document.getElementById('agrupacionClave').value = rowData.Agrupacion_Clave;
        }
        
        if (valoresMapeados) {
            // Prellenar los campos mapeados
            const periodoSelect = document.getElementById('periodo');
            const programaSelect = document.getElementById('programa');
            const sedeSelect = document.getElementById('sede');
            
            if (periodoSelect && valoresMapeados.periodo) {
                const valorPeriodo = encontrarOpcionPorTexto(periodoSelect, valoresMapeados.periodo);
                if (valorPeriodo) {
                    periodoSelect.value = valorPeriodo;
                    $(periodoSelect).trigger('change');
                    info('Periodo prellenado:', valoresMapeados.periodo);
                }
            }
            
            if (programaSelect && valoresMapeados.programa) {
                const valorPrograma = encontrarOpcionPorTexto(programaSelect, valoresMapeados.programa);
                if (valorPrograma) {
                    programaSelect.value = valorPrograma;
                    $(programaSelect).trigger('change');
                    info('Programa prellenado:', valoresMapeados.programa);
                }
            }
            
            if (sedeSelect && valoresMapeados.sede) {
                const valorSede = encontrarOpcionPorTexto(sedeSelect, valoresMapeados.sede);
                if (valorSede) {
                    sedeSelect.value = valorSede;
                    $(sedeSelect).trigger('change');
                    info('Sede prellenada:', valoresMapeados.sede);
                }
            }
            
            // Actualizar modalidad
            const modalidadInput = document.getElementById('modalidad');
            if (modalidadInput && valoresMapeados.sede) {
                modalidadInput.value = valoresMapeados.sede.toLowerCase().includes('online') ? 'L' : 'P';
            }
        }
        
        // Prellenar otros campos del formulario
        const camposParaPrellenar = [
            'Estudiante_FirstName', 'Estudiante_ApellidoPaterno', 'Estudiante_ApellidoMaterno',
            'Estudiante_SexoLegal', 'Estudiante_Phone', 'Estudiante_Email', 'Universidad_Graduacion',
            'Horario_Contacto', 'a_os_graduacion'
        ];
        
        camposParaPrellenar.forEach(campo => {
            const elemento = document.getElementById(campo);
            if (elemento && rowData[campo]) {
                if (elemento.tagName === 'SELECT') {
                    elemento.value = rowData[campo];
                    $(elemento).trigger('change');
                } else {
                    elemento.value = rowData[campo];
                }
                info('Campo prellenado:', campo, '=', rowData[campo]);
            }
        });
        
        // Prellenar checkbox de aviso de privacidad
        if (rowData.aviso_privacidad === 'True') {
            document.getElementById('avisoCheckbox').checked = true;
            document.getElementById('aviso_privacidad_input').value = 'true';
        }
        
        // Prellenar checkbox de WhatsApp
        if (rowData.comunicacion_whatsapp === 'True') {
            document.getElementById('whatsappCheckbox').checked = true;
            document.getElementById('whatsapp_input').value = 'true';
        }
        
        // Prellenar prefijo telefónico
        if (rowData.Estudiante_CodePhone) {
            document.getElementById('prefijo').value = rowData.Estudiante_CodePhone;
            document.getElementById('Estudiante_CodePhone').value = rowData.Estudiante_CodePhone;
        }
        
        // Deshabilitar campos después de prellenar
        setTimeout(() => {
            const camposDeshabilitar = ['periodo', 'programa', 'sede', 'anios_profesional'];
            camposDeshabilitar.forEach(campo => {
                const element = document.getElementById(campo);
                if (element && element.value) {
                    element.disabled = true;
                    info('Campo deshabilitado:', campo);
                }
            });
        }, 3000);
        
    } catch (e) {
        err('Error en prellenarFormulario:', e);
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    info('DOM cargado, iniciando prellenado en 3 segundos...');
    setTimeout(prellenarFormulario, 3000);
});