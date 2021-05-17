import axios from "axios";

//* ENTORNO *//

// RCIUAbsFrequencyYears
export const RCIUAbsFrequencyYears = async () => {
  try {
    const res = await axios.get(`/api/entorno/RCIUaf`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIURelativeFrequencyYears
export const RCIURelativeFrequencyYears = async () => {
  try {
    const res = await axios.get(`/api/entorno/RCIUrf`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIURelativeFrequencyPremature
export const RCIURelativeFrequencyPremature = async (
  inicio,
  fin,
  variables,
  isPrem
) => {
  try {
    const res = await axios.post("/api/entorno/RCIUInitrfprem", {
      inicio: inicio,
      fin: fin,
      vars: variables,
      prem: isPrem,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUAbsoluteFrequencyPremature
export const RCIUAbsoluteFrequencyPremature = async (
  inicio,
  fin,
  variable,
  isPrem
) => {
  try {
    const res = await axios.post("/api/entorno/RCIUInitafprem", {
      inicio: inicio,
      fin: fin,
      var: variable,
      prem: isPrem,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUFreqAC
export const RCIUFreqAC = async (inicio, fin, variable) => {
  try {
    const res = await axios.get("/api/entorno/RCIUFreqAC", {
      params: {
        inicio: inicio,
        fin: fin,
        var: variable,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUAFPromMedidaMadre
export const RCIUAFPromMedidaMadre = async (inicio, fin, variable) => {
  try {
    const res = await axios.get("/api/entorno/RCIUAFPromMedidaMadre", {
      params: {
        inicio: inicio,
        fin: fin,
        var: variable,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIURFEstudiosMadre
export const RCIURFEstudiosMadre = async (inicio, fin, isPrem, estudio) => {
  try {
    const res = await axios.get("/api/entorno/RCIURFEstudiosMadre", {
      params: {
        inicio: inicio,
        fin: fin,
        prem: isPrem,
        estudio: estudio,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIURFIngresosMadre
export const RCIURFIngresosMadre = async (
  inicio,
  fin,
  isPrem,
  desde,
  hasta
) => {
  try {
    const res = await axios.get("/api/entorno/RCIURFIngresosMadre", {
      params: {
        inicio: inicio,
        fin: fin,
        prem: isPrem,
        desde: desde,
        hasta: hasta,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUAFMedidaMadre
export const RCIUAFMedidaMadre = async (
  inicio,
  fin,
  variable,
  isPrem,
  desde,
  hasta
) => {
  try {
    const res = await axios.get("/api/entorno/RCIUAFMedidaMadre", {
      params: {
        inicio: inicio,
        fin: fin,
        var: variable,
        prem: isPrem,
        desde: desde,
        hasta: hasta,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUAntEntornoVars
export const RCIUAntEntornoVars = async () => {
  try {
    const res = await axios.get(`/api/entorno/RCIUAntEntornoVars`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
