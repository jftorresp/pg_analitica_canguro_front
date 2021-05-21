import axios from "axios";

//* CRECIMIENTO *//

// RCIUFreqDiasH
export const RCIUFreqDiasH = async (inicio, fin, variables) => {
  try {
    const res = await axios.post(`/api/crecimiento/RCIUFreqDiasH`, {
      inicio: inicio,
      fin: fin,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUFreqUCI
export const RCIUFreqUCI = async (inicio, fin, isPrem, variables) => {
  try {
    const res = await axios.post(`/api/crecimiento/RCIUFreqUCI`, {
      inicio: inicio,
      fin: fin,
      prem: isPrem,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUFreqEGEntrada
export const RCIUFreqEGEntrada = async (
  inicio,
  fin,
  isPrem,
  isEntrada,
  variables
) => {
  try {
    const res = await axios.post(`/api/crecimiento/RCIUFreqEGEntrada`, {
      inicio: inicio,
      fin: fin,
      prem: isPrem,
      entrada: isEntrada,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// parallelPMC
export const parallelPMC = async (inicio, fin, number, variables) => {
  try {
    const res = await axios.post(`/api/crecimiento/parallelCoordsPMC`, {
      inicio: inicio,
      fin: fin,
      graph: number,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUPromPesoPMC
export const RCIUPromPesoPMC = async (inicio, fin, number, variables) => {
  try {
    const res = await axios.post(`/api/crecimiento/RCIUPromPesoPMC`, {
      inicio: inicio,
      fin: fin,
      graph: number,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUOxiEntrada
export const RCIUOxiEntrada = async (inicio, fin, variables) => {
  try {
    const res = await axios.post(`/api/crecimiento/RCIUOxiEntrada`, {
      inicio: inicio,
      fin: fin,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIULecheMaterna
export const RCIULecheMaterna = async (inicio, fin, variables) => {
  try {
    const res = await axios.post(`/api/crecimiento/RCIULecheMaterna`, {
      inicio: inicio,
      fin: fin,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIULecheMaternaTime
export const RCIULecheMaternaTime = async (inicio, fin, time, variables) => {
  try {
    const res = await axios.post(`/api/crecimiento/RCIULecheMaternaTime`, {
      inicio: inicio,
      fin: fin,
      tiempo: time,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUAbsLecheMaternaTime
export const RCIUAbsLecheMaternaTime = async (
  inicio,
  fin,
  time,
  rciu,
  variables
) => {
  try {
    const res = await axios.post(`/api/crecimiento/RCIUAbsLecheMaternaTime`, {
      inicio: inicio,
      fin: fin,
      tiempo: time,
      rciu: rciu,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const parallelCoordsLecheMaterna = async (
  inicio,
  fin,
  time,
  rciu,
  variables,
  leche
) => {
  try {
    const res = await axios.post(
      `/api/crecimiento/parallelCoordsLecheMaterna`,
      {
        inicio: inicio,
        fin: fin,
        time: time,
        rciu: rciu,
        vars: variables,
        leche: leche,
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// getEtapasCrecimiento
export const getEtapasCrecimiento = async () => {
  try {
    const res = await axios.get(`/api/crecimiento/getEtapasCrecimiento`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVarsByEtapaCrecimiento = async (etapas) => {
  try {
    const data = await axios.post(
      "/api/crecimiento/getVarsByEtapaCrecimiento",
      {
        etapa: etapas,
      }
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUNut4012
export const RCIUNut4012 = async (inicio, fin, time, variables) => {
  try {
    const res = await axios.post(`/api/crecimiento/RCIUNut4012`, {
      inicio: inicio,
      fin: fin,
      time: time,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// getGriffiths
export const getGriffiths = async (inicio, fin, variables, graph) => {
  try {
    const res = await axios.post(`/api/crecimiento/getGriffiths`, {
      inicio: inicio,
      fin: fin,
      vars: variables,
      graph: graph,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIUInfanibProm = async (inicio, fin, variables, graph) => {
  try {
    const res = await axios.post("/api/crecimiento/RCIUInfanibProm", {
      inicio: inicio,
      fin: fin,
      vars: variables,
      graph: graph,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIUInfanibTime = async (inicio, fin, time, variables, graph) => {
  try {
    const res = await axios.post("/api/crecimiento/RCIUInfanibTime", {
      inicio: inicio,
      fin: fin,
      time: time,
      graph: graph,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIUoftalmologia = async (inicio, fin, variables, graph) => {
  try {
    const res = await axios.post("/api/crecimiento/RCIUoftalmologia", {
      inicio: inicio,
      fin: fin,
      graph: graph,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIUoptometria = async (inicio, fin, variables, graph) => {
  try {
    const res = await axios.post("/api/crecimiento/RCIUoptometria", {
      inicio: inicio,
      fin: fin,
      graph: graph,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIUaudiometria = async (inicio, fin, variables, graph) => {
  try {
    const res = await axios.post("/api/crecimiento/RCIUaudiometria", {
      inicio: inicio,
      fin: fin,
      graph: graph,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIUPromMedidasGrowth = async (
  inicio,
  fin,
  variables,
  variable
) => {
  try {
    const res = await axios.post("/api/crecimiento/RCIUPromMedidasGrowth", {
      inicio: inicio,
      fin: fin,
      var: variable,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIUMedidaAnio = async (inicio, fin, variables, variable) => {
  try {
    const res = await axios.post("/api/crecimiento/RCIUMedidaAnio", {
      inicio: inicio,
      fin: fin,
      var: variable,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
