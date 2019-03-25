import { create } from 'apisauce'
import axios from 'axios';
const api = create({
    baseURL: "https://xxxx.com",
    headers: { Accept: "application/json" }
});

class SubcategoryService {
    // baseUrl() { 
    //     return '10.1.110.33:9090' 
    // }
    // parseUrl(url) { 
    //     return this.baseUrl() + url; 
    // }

    getItems = () => {
        const url = "localhost:9090/categories"
        console.log(url);
        axios
            .get(url)
            .then(response => console.log(response))
            .catch(error => console.log("sdfsdf" + error));
        // axios
        //     .get("10.1.110.33:9090/categories")
        //     .then(function (response) {
        //         if (response.status === 200 && response != null) {
        //             var data = response.data
        //             return data
        //         } else {
        //             throw new Error('Empty data')
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log("1.error " + error)
        //         return [] // Return empty array in case error response.
        //     })
    }
    ListSubcategories() {
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
        const subcategories = [


            { checked: false, Id: '1', Code: '1', ParentId: '', Description: 'chuyên mục con', Title: 'Thượng đỉnh Mỹ - Triều' },
            { checked: false, Id: '2', Code: '2', ParentId: '', Description: 'chuyên mục con', Title: 'Giao thông' },
            { checked: false, Id: '3', Code: '3', ParentId: '', Description: 'chuyên mục con', Title: 'Nông nghiệp sạch' },



            { checked: false, Id: '4', Code: '4', ParentId: '', Description: 'chuyên mục con', Title: 'Thượng đỉnh Mỹ - Triều' },
            { checked: false, Id: '5', Code: '5', ParentId: '', Description: 'chuyên mục con', Title: 'Tư liệu' },
            { checked: false, Id: '6', Code: '6', ParentId: '', Description: 'chuyên mục con', Title: 'Phân tích' },
            { checked: false, Id: '7', Code: '7', ParentId: '', Description: 'chuyên mục con', Title: 'Người Việt 5 châu' },
            { checked: false, Id: '8', Code: '8', ParentId: '', Description: 'chuyên mục con', Title: 'Cuộc sống đó đây' },
            { checked: false, Id: '9', Code: '9', ParentId: '', Description: 'chuyên mục con', Title: 'Quân sự' },



            { checked: false, Id: '10', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Doanh nghiệp' },
            { checked: false, Id: '11', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Bất động sản' },
            { checked: false, Id: '12', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Ebank' },
            { checked: false, Id: '13', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Thương mại điện tử' },
            { checked: false, Id: '14', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Hàng hóa' },
            { checked: false, Id: '15', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tiền của tôi' },
            { checked: false, Id: '16', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Chứng khoán' },
            { checked: false, Id: '17', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Quốc tế' },
            { checked: false, Id: '18', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Vĩ mô' },
            { checked: false, Id: '19', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Startup' },


            { checked: false, Id: '20', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Giới sao' },
            { checked: false, Id: '21', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'VIdeo' },
            { checked: false, Id: '22', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'The Oscars' },
            { checked: false, Id: '23', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Phim' },
            { checked: false, Id: '24', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Nhạc' },
            { checked: false, Id: '25', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Thời trang' },
            { checked: false, Id: '26', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Làm đẹp' },
            { checked: false, Id: '27', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Truyền hình' },
            { checked: false, Id: '28', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Sách' },
            { checked: false, Id: '29', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Sân khấu - Mỹ thuật' },
            { checked: false, Id: '30', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Cộng đồng' },
            { checked: false, Id: '31', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Thư viện' },

            { checked: false, Id: '32', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'VIdeo' },
            { checked: false, Id: '33', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Bóng đá' },
            { checked: false, Id: '34', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tennis' },
            { checked: false, Id: '35', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Các môn khác' },
            { checked: false, Id: '36', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Hậu trường' },
            { checked: false, Id: '37', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Ảnh' },
            { checked: false, Id: '38', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tường thuật' },
            { checked: false, Id: '39', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Lịch thi đấu' },
            { checked: false, Id: '40', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'V-League' },

            { checked: false, Id: '41', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Hồ sơ phá án' },
            { checked: false, Id: '42', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tư vấn' },

            { checked: false, Id: '43', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tuyển sinh' },
            { checked: false, Id: '44', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Trắc nghiệm' },
            { checked: false, Id: '45', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Học Tiếng Anh' },
            { checked: false, Id: '46', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Du học' },
            { checked: false, Id: '47', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Giáo dục 4.0' },

            { checked: false, Id: '48', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tin tức' },
            { checked: false, Id: '49', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Các bệnh' },
            { checked: false, Id: '50', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Ung thư' },
            { checked: false, Id: '51', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Khỏe đẹp' },
            { checked: false, Id: '52', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Dinh dưỡng' },

            { checked: false, Id: '53', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tổ ấm' },
            { checked: false, Id: '54', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Lối sống' },
            { checked: false, Id: '55', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Nhà' },
            { checked: false, Id: '56', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tiêu dùng' },

            { checked: false, Id: '57', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Viet nam' },
            { checked: false, Id: '58', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Quốc tế' },
            { checked: false, Id: '59', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Dấu chân' },
            { checked: false, Id: '60', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tư vấn' },
            { checked: false, Id: '61', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Ảnh' },
            { checked: false, Id: '62', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Cẩm nang' },

            { checked: false, Id: '63', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Trong nước' },
            { checked: false, Id: '64', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Giải mã' },
            { checked: false, Id: '65', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Thường thức' },
            { checked: false, Id: '66', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Chuyện lạ' },
            { checked: false, Id: '67', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Hỏi - Đáp' },

            { checked: false, Id: '68', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Đời sống số' },
            { checked: false, Id: '69', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Sản phẩm' },
            { checked: false, Id: '70', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Điện tử gia dụng' },
            { checked: false, Id: '71', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Kinh nghiệm' },
            { checked: false, Id: '72', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'VIdeo' },
            { checked: false, Id: '73', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Galaxy s10' },

            { checked: false, Id: '74', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tư vấn' },
            { checked: false, Id: '75', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Bảng giá' },
            { checked: false, Id: '76', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Thị trường' },
            { checked: false, Id: '77', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Diễn đàn' },
            { checked: false, Id: '78', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Mua-Bán' },
            { checked: false, Id: '79', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Thi bằng lái' },

            { checked: false, Id: '80', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Chuyên gia gỡ rối' },
            { checked: false, Id: '81', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Hẹn hò' },

            { checked: false, Id: '82', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Ảnh' },
            { checked: false, Id: '83', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'Tiểu phẩm' },
            { checked: false, Id: '84', Code: '', ParentId: '', Description: 'chuyên mục con', Title: 'VIdeo' },

        ];
        return subcategories;
    }
}

export default SubcategoryService;