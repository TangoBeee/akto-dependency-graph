import axios from 'axios';

export const fetchDependencyGraphNodes = async (swaggerSchema) => {
    try {
        const response = await axios.post('http://localhost:8080/api/create-dependency-graph', {
            "swaggerSchema": swaggerSchema
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
