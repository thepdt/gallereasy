
class ConfigAppService {
    getConfigApp = () => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/version/config/app"
        return fetch(url).then(res => res.json())
    }

    updateConfigApp(data) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/version/config/app";
        return fetch(url, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }
}

export default ConfigAppService;