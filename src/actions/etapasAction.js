import axios from "axios";

export const getStages = async () => {
  try {
    const res = await axios.get("/api/etapas");
    const dataEtapas = res.data.map((e) => e.nombre);
    const nombresEtapas = [];
    for (let i = 0; i < dataEtapas.length; i++) {
      nombresEtapas.push({ value: dataEtapas[i], label: dataEtapas[i] });
    }
    return nombresEtapas;
  } catch (error) {
    console.log(error);
  }
};
