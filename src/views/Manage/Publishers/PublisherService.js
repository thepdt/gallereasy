class PublisherService {
    getPublishers = () => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/publishers"
        return fetch(url).then(res => res.json())
    }

    getPublisherById = (id) => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/publishers/single/" + id
        return fetch(url).then(res => res.json())
    }

    createPublisher(publisher) {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/publishers";
        return fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(publisher)
        }).then(res => res.json());
    }

    updatePublisher(publisher) {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/publishers";
        return fetch(url, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(publisher)
        }).then(res => res.json());
    }

    deletePublisher(id) {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/publishers/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then(res => res.json());
    }
}


export default PublisherService;