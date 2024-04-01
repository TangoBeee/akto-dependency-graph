import OpenAPISchemaValidator from 'openapi-schema-validator';
import yaml from 'js-yaml';

const handleParse = (value) => {
    try {
      const parsedData = JSON.parse(value);
      return parsedData;
    } catch (jsonError) {
      try {
        const parsedData = yaml.load(value);
        return parsedData;
      } catch (yamlError) {
        return null;
      }
    }
};

export const validate = (value) => {
    const parsedData = handleParse(value);
    if(!parsedData) return false;

    const openApiVersion = detectOpenApiVersion(parsedData);
    if(!openApiVersion) return false;

    const validator = new OpenAPISchemaValidator({version: openApiVersion});

    const result = validator.validate(parsedData);

    return result.errors.length == 0;
}

const detectOpenApiVersion = (schema) => {
    if(!schema) return null;
    
    if (schema.openapi && schema.openapi.startsWith("3.")) {
        return 3;
    } else if (schema.swagger && schema.swagger.startsWith("2.")) {
        return 2;
    } else {
        return null;
    }
};
