
class VersionService {
    getVersions = () => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/version/app/android/list"
        return fetch(url).then(res => res.json())
    }

    createVersion(version) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/version/app/android/add";
        return fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(version)
        }).then(res => res.json());
    }

    updateVersion(version) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/version/app/android/update";
        return fetch(url, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(version)
        }).then(res => res.json());
    }

    deleteVersion(id) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/version/app/android/remove/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then(res => res.json());
    }
}

export default VersionService;