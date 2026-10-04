/**
 * Controlador de Cálculos Eléctricos - VoltCalc Mobile
 * Gestiona la lógica de ingeniería para la aplicación en campo.
 */

export const calcularLeyDeOhm = ({ opcion, valor1, valor2 }) => {
  const v1 = parseFloat(valor1);
  const v2 = parseFloat(valor2);

  if (isNaN(v1) || isNaN(v2) || v2 <= 0) {
    return { success: false, message: 'Ingrese valores numéricos válidos mayores a cero.' };
  }

  let resultado = 0;
  let unidad = '';

  switch (opcion.toUpperCase()) {
    case 'V': // Voltaje = Corriente * Resistencia (V = I * R)
      resultado = v1 * v2;
      unidad = 'Volts (V)';
      break;
    case 'I': // Corriente = Voltaje / Resistencia (I = V / R)
      resultado = v1 / v2;
      unidad = 'Amperios (A)';
      break;
    case 'R': // Resistencia = Voltaje / Corriente (R = V / I)
      resultado = v1 / v2;
      unidad = 'Ohmios (Ω)';
      break;
    case 'P': // Potencia = Voltaje * Corriente (P = V * I)
      resultado = v1 * v2;
      unidad = 'Vatios (W)';
      break;
    default:
      return { success: false, message: 'Opción de cálculo no válida [Use: V, I, R, P].' };
  }

  return {
    success: true,
    resultado: resultado.toFixed(2),
    unidad,
  };
};

export const calcularCaidaTension = ({ corriente, longitudMetros, seccionMm2, material = 'cobre' }) => {
  // Coeficiente de resistividad a 20°C: Cobre (~0.01724 ohm*mm2/m), Aluminio (~0.0282)
  const resistividad = material === 'cobre' ? 0.01724 : 0.0282;
  
  const i = parseFloat(corriente);
  const l = parseFloat(longitudMetros);
  const s = parseFloat(seccionMm2);

  if (isNaN(i) || isNaN(l) || isNaN(s) || s === 0) {
    return { success: false, message: 'Parámetros incompletos o inválidos para caída de tensión.' };
  }

  // Fórmula monofásica: ΔV = (2 * rho * L * I) / S
  const caidaV = (2 * resistividad * l * i) / s;
  const porcentajeCaida = (caidaV / 220) * 100; // Referencia estándar 220V

  return {
    success: true,
    caidaVoltios: caidaV.toFixed(2),
    porcentaje: porcentajeCaida.toFixed(2),
    cumpleNorma: porcentajeCaida <= 3.0, // Cumplimiento normativo habitual (< 3%)
  };
};