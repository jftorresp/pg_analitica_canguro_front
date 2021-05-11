import axios from "axios";

export const getData = async (
  etapaSelected,
  temaSelected,
  aniosSelected,
  varsSelected
) => {
  try {
    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value.includes(" ") === true) {
        varsSelected[i].value = varsSelected[i].value.replace(" ", ".");
      }
    }

    const data = await axios.post("/api/medidas/query", {
      years: aniosSelected ? aniosSelected.map((d) => d.value) : [],
      etapa: etapaSelected ? etapaSelected.value : "",
      temas: temaSelected ? temaSelected.map((d) => d.value) : [],
      vars: varsSelected ? varsSelected.map((d) => d.value) : [],
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getYears = async () => {
  try {
    const res = await axios.get("/api/medidas/anios");
    const years = res.data;
    const yearsSelect = [];
    for (let i = 0; i < years.length; i++) {
      yearsSelect.push({ value: years[i], label: years[i] });
    }
    return yearsSelect;
  } catch (error) {
    console.log(error);
  }
};

export const getVars = async (etapaSelected, temaSelected) => {
  try {
    const res = await axios.get("/api/medidas/vars", {
      params: {
        e: etapaSelected,
        neuro: temaSelected.some((tema) => tema.value === "NEURO")
          ? "true"
          : "false",
        vista: temaSelected.some((tema) => tema.value === "VISTA")
          ? "true"
          : "false",
        alimentacion: temaSelected.some((tema) => tema.value === "ALIMENTACION")
          ? "true"
          : "false",
      },
    });

    const varsSelect = [];
    const vars = res.data;
    for (let i = 0; i < vars.length; i++) {
      if (vars[i]["variable"].includes(".") === true) {
        vars[i]["variable"] = vars[i]["variable"].replace(".", " ");
      }
      varsSelect.push({
        value: vars[i]["variable"],
        label: vars[i]["variable"],
        tipo: vars[i]["tipo"],
      });
    }
    return varsSelect;
  } catch (error) {
    console.log(error);
  }
};

export const getValuesByVar = async (variable) => {
  try {
    const res = await axios.get(`/api/medidas/query/${variable}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDictByVar = async (variable) => {
  try {
    const res = await axios.get(`/api/medidas/dict/${variable}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDiscreteDist = async (varsSelected, anioSelected) => {
  try {
    const res = await axios.get("/api/medidas/dist", {
      params: {
        variable: varsSelected,
        anio: anioSelected,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getContinuosDist = async (varsSelected, anioSelected) => {
  try {
    const res = await axios.get("/api/medidas/cont", {
      params: {
        variable: varsSelected,
        anio: anioSelected,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const groupByYearsVar = async (aniosSelected, varsSelected) => {
  try {
    const data = await axios.post("/api/medidas/group", {
      years: aniosSelected,
      vars: varsSelected,
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const groupByYearsVarNumbers = async (aniosSelected, varsSelected) => {
  try {
    const data = await axios.post("/api/medidas/groupN", {
      years: aniosSelected,
      vars: varsSelected,
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getValuesByVarYears = async (aniosSelected, varSelected) => {
  try {
    const data = await axios.post("/api/medidas/queryVars", {
      years: aniosSelected,
      var: varSelected,
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getParallelCoordinates = async (year, tipoRCIU, etapa) => {
  try {
    const res = await axios.get("/api/medidas/parallel", {
      params: {
        year: year,
        rciu: tipoRCIU,
        etapa: etapa,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getParallelCoordinatesVars = async () => {
  try {
    const res = await axios.get(`/api/medidas/parallelVars`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// ENTORNO //

export const RCIUAbsFrequencyYears = async () => {
  try {
    const res = await axios.get(`/api/medidas/RCIUaf`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIURelativeFrequencyYears = async () => {
  try {
    const res = await axios.get(`/api/medidas/RCIUrf`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIURelativeFrequencyPremature = async (
  inicio,
  fin,
  variables,
  isPrem
) => {
  try {
    const res = await axios.post("/api/medidas/RCIUInitrfprem", {
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

export const RCIUAbsoluteFrequencyPremature = async (
  inicio,
  fin,
  variable,
  isPrem
) => {
  try {
    const res = await axios.post("/api/medidas/RCIUInitafprem", {
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

export const RCIUFreqAC = async (inicio, fin, variable) => {
  try {
    const res = await axios.get("/api/medidas/RCIUFreqAC", {
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

export const RCIUAFPromMedidaMadre = async (inicio, fin, variable) => {
  try {
    const res = await axios.get("/api/medidas/RCIUAFPromMedidaMadre", {
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

export const RCIURFEstudiosMadre = async (inicio, fin, isPrem) => {
  try {
    const res = await axios.get("/api/medidas/RCIURFEstudiosMadre", {
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

export const RCIURFIngresosMadre = async (inicio, fin, isPrem) => {
  try {
    const res = await axios.get("/api/medidas/RCIURFIngresosMadre", {
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

export const RCIUAFMedidaMadre = async (inicio, fin, variable, isPrem) => {
  try {
    const res = await axios.get("/api/medidas/RCIUAFMedidaMadre", {
      params: {
        inicio: inicio,
        fin: fin,
        var: variable,
        prem: isPrem,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIUAntEntornoVars = async () => {
  try {
    const res = await axios.get(`/api/medidas/RCIUAntEntornoVars`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//* NACIMIENTO *//

export const RCIUFreqCesarea = async (inicio, fin, isPrem) => {
  try {
    const res = await axios.get("/api/medidas/RCIUFreqCesarea", {
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

export const RCIUFreqGender = async (inicio, fin, isPrem, rciu) => {
  try {
    const res = await axios.get("/api/medidas/RCIUFreqGender", {
      params: {
        inicio: inicio,
        fin: fin,
        prem: isPrem,
        rciu: rciu,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIUFreqEdadGes = async (inicio, fin) => {
  try {
    const res = await axios.get("/api/medidas/RCIUFreqEdadGes", {
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

export const RCIUFreqEGPremTerm = async (inicio, fin) => {
  try {
    const res = await axios.get("/api/medidas/RCIUFreqEGPremTerm", {
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

export const RCIUAFPromMedidaBebeNacer = async (
  inicio,
  fin,
  isPrem,
  variable
) => {
  try {
    const res = await axios.get("/api/medidas/RCIUAFPromMedidaBebeNacer", {
      params: {
        inicio: inicio,
        fin: fin,
        prem: isPrem,
        var: variable,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RCIURCEUFreq = async (inicio, fin, isPrem) => {
  try {
    const res = await axios.get("/api/medidas/RCIURCEUFreq", {
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

export const RCIUAntNacimientoVars = async () => {
  try {
    const res = await axios.get(`/api/medidas/RCIUAntNacimientoVars`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//! Datos generales

export const GenderBaseData = async () => {
  try {
    const res = await axios.get(`/api/medidas/GenderBaseData`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//* CRECIMIENTO *//

export const RCIUFreqDiasH = async (inicio, fin) => {
  try {
    const res = await axios.get(`/api/medidas/RCIUFreqDiasH`, {
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

export const RCIUFreqUCI = async (inicio, fin, isPrem) => {
  try {
    const res = await axios.get(`/api/medidas/RCIUFreqUCI`, {
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

export const RCIUFreqEGEntrada = async (inicio, fin, isPrem, isEntrada) => {
  try {
    const res = await axios.get(`/api/medidas/RCIUFreqEGEntrada`, {
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

export const parallelPMC = async (inicio, fin, number) => {
  try {
    const res = await axios.get(`/api/medidas/parallelPMC`, {
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

export const RCIUPromPesoPMC = async (inicio, fin, number) => {
  try {
    const res = await axios.get(`/api/medidas/RCIUPromPesoPMC`, {
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

export const RCIUOxiEntrada = async (inicio, fin) => {
  try {
    const res = await axios.get(`/api/medidas/RCIUOxiEntrada`, {
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
