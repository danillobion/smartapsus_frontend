import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8082/api/v1";

export const generica = async ({ metodo = '', uri = '', params = {}, data = {} }) => {
  try {
    const url = `${BASE_URL}${uri}`;

    const response = await axios({
      method: metodo,
      url: url,
      params: params,
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response;
  } catch (error) {
      console.error(`Erro ao fazer requisição ${metodo} para ${uri}:`, error);
    return error.response;
  }
};
