import axios from "axios";
import yaml from "js-yaml";

export const validate = async (value) => {
    try {
      const response = await axios.post((import.meta.env.VITE_OPENAPI_VALIDATION_BASE_URL)+'/api/openapi-validator', {
        "schema": value
      }, {
        headers: {
            'Content-Type': 'application/json',
        }
      });
      
      return handleStringify(response.data);
    } catch (err) {
      return false;
    }
}

const handleStringify = (api) => {
  try {
    return JSON.stringify(api);
  } catch (jsonError) {
    try {
      return yaml.dump(api);
    } catch (yamlError) {
      return false;
    }
  }
};