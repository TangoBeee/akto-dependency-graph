import axios from "axios";

export const fetchJob = async (openApi, setError) => {
    try {
        const response = await axios.post((import.meta.env.VITE_API_BASE_URL)+'/api/create-dependency-graph', {
            "apiData": openApi
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = response.data;
        return data.jobId;
    } catch (error) {
        setError(error.response.data.actionErrors[0]);
        return null;
    }
}

export const getJobStatus = async (jobId, setError) => {
    try {
        const response = await axios.post((import.meta.env.VITE_API_BASE_URL)+'/api/dependency-graph-status', {
            "jobId": jobId
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = response.data;
        return data;
    } catch (error) {
        const err = error.response.data.actionErrors[0];
        if(err && err === 'NOT_FOUND') {
            setError("Please wait for a moment...");
            return null;
        } else {
            setError(err);
            return err;
        }
    }
}
