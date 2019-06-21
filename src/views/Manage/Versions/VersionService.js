import api from './../../../Environment'

class VersionService {
    getVersions = () => {
        const url = api.apiManage.getBaseURL() + "/version/list"
        return fetch(url).then(res => res.json())
    }

    createVersion(version) {
        const url =  api.apiManage.getBaseURL() + "/version/add";
        return fetch(url, {
            method: 'POST',
            headers: api.apiManage.headers,
            body: JSON.stringify(version)
        }).then(res => res.json());
    }

    updateVersion(version) {
        const url =  api.apiManage.getBaseURL() + "/version/update";
        return fetch(url, {
            method: 'PUT',
            headers: api.apiManage.headers,
            body: JSON.stringify(version)
        }).then(res => res.json());
    }

    deleteVersion(id) {
        const url =  api.apiManage.getBaseURL() + "/version/remove/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.apiManage.headers,
        }).then(res => res.json());
    }
}

export default VersionService;