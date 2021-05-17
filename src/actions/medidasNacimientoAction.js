import axios from "axios";

//* NACIMIENTO *//

// RCIUFreqCesarea
export const RCIUFreqCesarea = async (inicio, fin, isPrem, variables) => {
  try {
    const res = await axios.post("/api/nacimiento/RCIUFreqCesarea", {
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

// RCIUFreqGender
export const RCIUFreqGender = async (inicio, fin, isPrem, rciu, variables) => {
  try {
    const res = await axios.post("/api/nacimiento/RCIUFreqGender", {
      inicio: inicio,
      fin: fin,
      prem: isPrem,
      rciu: rciu,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUFreqEdadGes
export const RCIUFreqEdadGes = async (inicio, fin, variables) => {
  try {
    const res = await axios.post("/api/nacimiento/RCIUFreqEdadGes", {
      inicio: inicio,
      fin: fin,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUFreqEGPremTerm
export const RCIUFreqEGPremTerm = async (inicio, fin, variables) => {
  try {
    const res = await axios.post("/api/nacimiento/RCIUFreqEGPremTerm", {
      inicio: inicio,
      fin: fin,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIUAFPromMedidaBebeNacer
export const RCIUAFPromMedidaBebeNacer = async (
  inicio,
  fin,
  isPrem,
  variable,
  variables
) => {
  try {
    const res = await axios.post("/api/nacimiento/RCIUAFPromMedidaBebeNacer", {
      inicio: inicio,
      fin: fin,
      prem: isPrem,
      var: variable,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// RCIURCEUFreq
export const RCIURCEUFreq = async (inicio, fin, isPrem, variables) => {
  try {
    const res = await axios.post("/api/nacimiento/RCIURCEUFreq", {
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

// RCIUAntNacimientoVars
export const RCIUAntNacimientoVars = async () => {
  try {
    const res = await axios.get(`/api/nacimiento/RCIUAntNacimientoVars`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
