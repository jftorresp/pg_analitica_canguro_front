import axios from "axios";
//! Datos generales

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

export const GenderBaseData = async (inicio, fin, variables) => {
  try {
    const res = await axios.post(`/api/medidas/GenderBaseData`, {
      inicio: inicio,
      fin: fin,
      vars: variables,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
