import { create } from 'apisauce'

const api = create({
    baseURL: "https://xxxx.com",
    headers: { Accept: "application/json" }
});

class PostService {

    ListPosts() {
        // // Where we're fetching data from
        // get(`https://jsonplaceholder.typicode.com/users`)
        // // We get the API response and receive data in JSON format...
        // .then(response => response.json())
        // // ...then we update the users state
        // .then(data =>
        //     this.setState({
        //         users: data,
        //         isLoading: false,
        //     })
        // )
        // // Catch any errors we hit and update the app
        // .catch(error => this.setState({ error, isLoading: false }));
    };



    List() {
        const usersData = [
            { id: 1, name: 'John Doe', registered: '2018/01/01', role: 'Guest', checked: false },
            { id: 11111, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', checked: false },
            { id: 22222, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', checked: false },
            { id: 33333, name: 'Chetan Mohamed', registered: '2018/02/01', role: 'Admin', checked: false },
            { id: 44444, name: 'Derick Maximinus', registered: '2018/03/01', role: 'Member', checked: false },
            { id: 55555, name: 'Friderik Dávid', registered: '2018/01/21', role: 'Staff', checked: false },
            { id: 66666, name: 'Yiorgos Avraamu', registered: '2018/01/01', role: 'Member', checked: false },
            { id: 77777, name: 'Avram Tarasios', registered: '2018/02/01', role: 'Staff', checked: false },
            { id: 88888, name: 'Quintin Ed', registered: '2018/02/01', role: 'Admin', checked: false },
            { id: 99999, name: 'Enéas Kwadwo', registered: '2018/03/01', role: 'Member', checked: false },
            // { id: 10, name: 'Agapetus Tadeáš', registered: '2018/01/21', role: 'Staff', checked: false },
            // { id: 11, name: 'Carwyn Fachtna', registered: '2018/01/01', role: 'Member', checked: false },
            // { id: 12, name: 'Nehemiah Tatius', registered: '2018/02/01', role: 'Staff', checked: false },
            // { id: 13, name: 'Ebbe Gemariah', registered: '2018/02/01', role: 'Admin', checked: false },
            // { id: 14, name: 'Eustorgios Amulius', registered: '2018/03/01', role: 'Member', checked: false },
            // { id: 15, name: 'Leopold Gáspár', registered: '2018/01/21', role: 'Staff', checked: false },
            // { id: 16, name: 'Pompeius René', registered: '2018/01/01', role: 'Member', checked: false },
            // { id: 17, name: 'Paĉjo Jadon', registered: '2018/02/01', role: 'Staff', checked: false },
            // { id: 18, name: 'Micheal Mercurius', registered: '2018/02/01', role: 'Admin', checked: false },
            // { id: 19, name: 'Ganesha Dubhghall', registered: '2018/03/01', role: 'Member', checked: false },
            // { id: 20, name: 'Hiroto Šimun', registered: '2018/01/21', role: 'Staff', checked: false },
            // { id: 21, name: 'Vishnu Serghei', registered: '2018/01/01', role: 'Member', checked: false },
            // { id: 22, name: 'Zbyněk Phoibos', registered: '2018/02/01', role: 'Staff', checked: false },
            // { id: 23, name: 'Einar Randall', registered: '2018/02/01', role: 'Admin', checked: false },
            // { id: 24, name: 'Félix Troels', registered: '2018/03/21', role: 'Staff', checked: false },
            // { id: 25, name: 'Aulus Agmundr', registered: '2018/01/01', role: 'Member', checked: false },
            // { id: 42, name: 'Ford Prefex', registered: '2001/05/21', role: 'Alien', checked: false }
        ];
        return usersData;
    }
}

export default PostService;