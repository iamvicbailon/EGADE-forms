

        const form = document.getElementById('Formulario');
 
      form.addEventListener('submit', function (e) {
        e.preventDefault();
 
        let valid = true;
 
        // Validar todos los campos requeridos
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
          const isSelect = field.tagName === 'SELECT';
          const value = field.value.trim();
 
          if (!value || (isSelect && value === '')) {
            field.classList.add('is-invalid');
            valid = false;
          } else {
            field.classList.remove('is-invalid');
          }
        });
 
        // Validar campo de email
        const emailField = document.getElementById("Estudiante_Email");
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          emailField.classList.add('is-invalid');
          valid = false;
        } else {
          emailField.classList.remove('is-invalid');
        }
 
        // Validar campo de celular (6 a 15 dígitos numéricos)
        const celular = document.getElementById('Estudiante_Phone');
        if (!/^[0-9]{6,15}$/.test(celular.value.trim())) {
          celular.classList.add('is-invalid');
          valid = false;
        } else {
          celular.classList.remove('is-invalid');
        }
 
        // Validar checkbox de aviso de privacidad
        const avisoCheckbox = document.getElementById('avisoCheckbox');
        if (!avisoCheckbox.checked) {
          avisoCheckbox.classList.add('is-invalid');
          valid = false;
        } else {
          avisoCheckbox.classList.remove('is-invalid');
        }
 
        // Actualizar los campos hidden con el valor actual de los checkboxes
        document.getElementById('aviso_privacidad_input').value = avisoCheckbox.checked ? 'true' : 'false';
        const whatsappCheckbox = document.getElementById('whatsappCheckbox');
        document.getElementById('whatsapp_input').value = whatsappCheckbox.checked ? 'true' : 'false';
 
        // Copiar el valor del prefijo al campo oculto estudiante_code
        const prefijo = document.getElementById('prefijo');
        document.getElementById('Estudiante_CodePhone').value = prefijo.value;
 
        // Si todo es válido, enviar el formulario
        if (valid) {
          form.removeEventListener('submit', arguments.callee);
          form.submit();
        }
      });
 
    