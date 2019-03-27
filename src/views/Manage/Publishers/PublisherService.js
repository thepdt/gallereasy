import api from './../../../Environment'

class PublisherService {
    getPublishers = () => {
        const url = api.getBaseURL() + "/publishers"
        return fetch(url).then(res => res.json())
    }

    createPublisher(publisher) {
        const url =  api.getBaseURL() + "/publishers";
        return fetch(url, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify(publisher)
        }).then(res => res.json());
    }

    updatePublisher(publisher) {
        const url =  api.getBaseURL() + "/publishers";
        return fetch(url, {
            method: 'PUT',
            headers: api.headers,
            body: JSON.stringify(publisher)
        }).then(res => res.json());
    }

    deletePublisher(id) {
        const url =  api.getBaseURL() + "/publishers/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.headers,
        }).then(res => res.json());
    }
}


export default PublisherService;