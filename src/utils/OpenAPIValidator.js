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
      
      if(!response.data || !(response.data.openapi || response.data.swagger)) {
        return {
          "error": "Please enter a valid OpenAPI schema. (JSON or YAML)"
        }
      }

      if(response.data.error) {
        return {
          "error": response.data.error
        };
      }
      
      return handleStringify(response.data);
    } catch (err) {
      if(err.request && err.request.status === 0) {
        return {
          "error": err.message
        }
      }

      if(err.response && err.response.status === 413) {
        return {
          "error": "OpenAPI file is too large"
        }
      }

      if(err.response && err.response.data && err.response.data.error) {
        return err.response.data;
      }

      return {
        "error": err
      };
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