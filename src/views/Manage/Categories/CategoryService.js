import { create } from 'apisauce'
import axios from 'axios';
const api = create({
    baseURL: "https://xxxx.com",
    headers: { Accept: "application/json" }
});

class CategoryService {
    // baseUrl() { 
    //     return '10.1.110.33:9090' 
    // }
    // parseUrl(url) { 
    //     return this.baseUrl() + url; 
    // }
    updateCategory(category) {
        let url = "http://10.1.110.33:9090/categories";
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        }).then(res => res.json());
    }
    

    getCategories = () => {
        const url = "http://10.1.110.33:9090/categories"
        return fetch(url).then(res => res.json())
    }


    ListCategories() {
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
        const categories = [
            { Code: 1, Id: '1', Description: 'chuyên mục', Title: 'Thời sự', checked: false   }, 
            { Code: 2, Id: '2', Description: 'chuyên mục', Title: 'Thế giới' , checked: false }, 
            { Code: 3, Id: '3', Description: 'chuyên mục', Title: 'Kinh doanh', checked: false  }, 
            { Code: 4, Id: '4', Description: 'chuyên mục', Title: 'Giải trí', checked: false  },
            { Code: 5, Id: '5', Description: 'chuyên mục', Title: 'thể thao', checked: false  }, 
            { Code: 6, Id: '6', Description: 'chuyên mục', Title: 'Pháp luật', checked: false  }, 
            { Code: 7, Id: '7', Description: 'chuyên mục', Title: 'Giảo dục', checked: false  }, 
            { Code: 8, Id: '8', Description: 'chuyên mục', Title: 'Sức khỏe', checked: false  },
            { Code: 9, Id: '9', Description: 'chuyên mục', Title: 'Đời sống', checked: false  }, 
            { Code: 10, Id: '10', Description: 'chuyên mục', Title: 'Du lịch', checked: false  }, 
            { Code: 11, Id: '11', Description: 'chuyên mục', Title: 'Khoa học', checked: false  }, 
            { Code: 12, Id: '12', Description: 'chuyên mục', Title: 'Công nghệ', checked: false  },
            { Code: 13, Id: '13', Description: 'chuyên mục', Title: 'Xe', checked: false  }, 
            { Code: 1, Id: '14', Description: 'chuyên mục', Title: 'Tâm sự', checked: false  }, 
            { Code: 15, Id: '15', Description: 'chuyên mục', Title: 'Cười', checked: false  }
        ];
        return categories;
    }
}

export default CategoryService;