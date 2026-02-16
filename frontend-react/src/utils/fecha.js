export const formatearFechaLocal = (fechaISO) => {
  if (!fechaISO) return "-";

  return new Date(fechaISO).toLocaleString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const fechaParaInput = (fechaISO) => {
  if (!fechaISO) return "";

  const date = new Date(fechaISO);
  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date - offset).toISOString().slice(0, 16);
};
