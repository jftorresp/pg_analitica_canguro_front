import axios from "axios";

export const getTopics = async () => {
  try {
    const res = await axios.get("/api/temas");
    const dataTemas = res.data.map((e) => e.nombre);
    const nombresTemas = [];
    for (let i = 0; i < dataTemas.length; i++) {
      nombresTemas.push({ value: dataTemas[i], label: dataTemas[i] });
    }
    return nombresTemas;
  } catch (error) {
    console.log(error);
  }
};
