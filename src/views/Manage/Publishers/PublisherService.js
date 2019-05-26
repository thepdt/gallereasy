import api from './../../../Environment'

class PublisherService {
    getPublishers = () => {
        const url = api.apiManage.getBaseURL() + "/news/publishers"
        return fetch(url).then(res => res.json())
    }

    getPublisherById = (id) => {
        const url = api.apiManage.getBaseURL() + "/news/publishers/single/" + id
        return fetch(url).then(res => res.json())
    }

    createPublisher(publisher) {
        const url = api.apiManage.getBaseURL() + "/news/publishers";
        return fetch(url, {
            method: 'POST',
            headers: api.apiManage.headers,
            body: JSON.stringify(publisher)
        }).then(res => res.json());
    }

    updatePublisher(publisher) {
        const url = api.apiManage.getBaseURL() + "/news/publishers";
        return fetch(url, {
            method: 'PUT',
            headers: api.apiManage.headers,
            body: JSON.stringify(publisher)
        }).then(res => res.json());
    }

    deletePublisher(id) {
        const url = api.apiManage.getBaseURL() + "/news/publishers/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.apiManage.headers,
        }).then(res => res.json());
    }
}


export default PublisherService;