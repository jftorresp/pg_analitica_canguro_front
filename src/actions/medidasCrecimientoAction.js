import axios from "axios";

//* CRECIMIENTO *//

// RCIUFreqDiasH
export const RCIUFreqDiasH = async (inicio, fin) => {
  try {
    const res = await axios.get(`/api/crecimiento/RCIUFreqDiasH`, {
      params: {
        inicio: inicio,
        fin: fin,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUFreqUCI
export const RCIUFreqUCI = async (inicio, fin, isPrem) => {
  try {
    const res = await axios.get(`/api/crecimiento/RCIUFreqUCI`, {
      params: {
        inicio: inicio,
        fin: fin,
        prem: isPrem,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUFreqEGEntrada
export const RCIUFreqEGEntrada = async (inicio, fin, isPrem, isEntrada) => {
  try {
    const res = await axios.get(`/api/crecimiento/RCIUFreqEGEntrada`, {
      params: {
        inicio: inicio,
        fin: fin,
        prem: isPrem,
        entrada: isEntrada,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// parallelPMC
export const parallelPMC = async (inicio, fin, number) => {
  try {
    const res = await axios.get(`/api/crecimiento/parallelCoordsPMC`, {
      params: {
        inicio: inicio,
        fin: fin,
        graph: number,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUPromPesoPMC
export const RCIUPromPesoPMC = async (inicio, fin, number) => {
  try {
    const res = await axios.get(`/api/crecimiento/RCIUPromPesoPMC`, {
      params: {
        inicio: inicio,
        fin: fin,
        graph: number,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUOxiEntrada
export const RCIUOxiEntrada = async (inicio, fin) => {
  try {
    const res = await axios.get(`/api/crecimiento/RCIUOxiEntrada`, {
      params: {
        inicio: inicio,
        fin: fin,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIULecheMaterna
export const RCIULecheMaterna = async (inicio, fin) => {
  try {
    const res = await axios.get(`/api/crecimiento/RCIULecheMaterna`, {
      params: {
        inicio: inicio,
        fin: fin,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIULecheMaternaTime
export const RCIULecheMaternaTime = async (inicio, fin, time) => {
  try {
    const res = await axios.get(`/api/crecimiento/RCIULecheMaternaTime`, {
      params: {
        inicio: inicio,
        fin: fin,
        tiempo: time,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUAbsLecheMaternaTime
export const RCIUAbsLecheMaternaTime = async (inicio, fin, time, rciu) => {
  try {
    const res = await axios.get(`/api/crecimiento/RCIUAbsLecheMaternaTime`, {
      params: {
        inicio: inicio,
        fin: fin,
        tiempo: time,
        rciu: rciu,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const parallelCoordsLecheMaterna = async (inicio, fin, time, rciu) => {
  try {
    const res = await axios.get(`/api/crecimiento/parallelCoordsLecheMaterna`, {
      params: {
        inicio: inicio,
        fin: fin,
        time: time,
        rciu: rciu,
      },
    });

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
export const RCIUNut4012 = async (inicio, fin, time) => {
  try {
    const res = await axios.get(`/api/crecimiento/RCIUNut4012`, {
      params: {
        inicio: inicio,
        fin: fin,
        time: time,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
