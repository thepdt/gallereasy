import api from './../../../Environment'

class PostService {

    getPosts = () => {
        const url = api.getBaseURL() + "/posts"
        return fetch(url).then(res => res.json())
    }

    createPost(post) {
        const url =  api.getBaseURL() + "/posts";
        return fetch(url, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify(post)
        }).then(res => res.json());
    }

    updatePost(post) {
        const url =  api.getBaseURL() + "/posts";
        return fetch(url, {
            method: 'PUT',
            headers: api.headers,
            body: JSON.stringify(post)
        }).then(res => res.json());
    }

    deletePost(id) {
        const url =  api.getBaseURL() + "/posts/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.headers,
        }).then(res => res.json());
    }



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
// categorySelects: [
//     { value: false, id: '1', label: 'Thời sự' }, { value: false, id: '2', label: 'Thế giới' }, { value: false, id: '3', label: 'Kinh doanh' }, { value: false, id: '4', label: 'Giải trí' },
//     { value: false, id: '5', label: 'thể thao' }, { value: false, id: '6', label: 'Pháp luật' }, { value: false, id: '7', label: 'Giảo dục' }, { value: false, id: '8', label: 'Sức khỏe' },
//     { value: false, id: '9', label: 'Đời sống' }, { value: false, id: '10', label: 'Du lịch' }, { value: false, id: '11', label: 'Khoa học' }, { value: false, id: '12', label: 'Công nghệ' },
//     { value: false, id: '13', label: 'Xe' }, { value: false, id: '14', label: 'Tâm sự' }, { value: false, id: '15', label: 'Cười' }
// ]
// subcategories: [
//     {
//         parentCatId: 1,
//         subCat: [
//             { value: false, id: '1', label: 'Thượng đỉnh Mỹ - Triều' }, { value: false, id: '2', label: 'Giao thông' }, { value: false, id: '3', label: 'Nông nghiệp sạch' },
//         ],
//     },
//     {
//         parentCatId: 2,
//         subCat: [
//             { value: false, id: '4', label: 'Thượng đỉnh Mỹ - Triều' }, { value: false, id: '5', label: 'Tư liệu' }, { value: false, id: '6', label: 'Phân tích' }, { value: false, id: '7', label: 'Người Việt 5 châu' }, { value: false, id: '8', label: 'Cuộc sống đó đây' }, { value: false, id: '9', label: 'Quân sự' }
//         ],
//     },
//     {
//         parentCatId: 3,
//         subCat: [
//             { value: false, id: '10', label: 'Doanh nghiệp' }, { value: false, id: '11', label: 'Bất động sản' }, { value: false, id: '12', label: 'Ebank' }, { value: false, id: '13', label: 'Thương mại điện tử' }, { value: false, id: '14', label: 'Hàng hóa' },
//             { value: false, id: '15', label: 'Tiền của tôi' }, { value: false, id: '16', label: 'Chứng khoán' }, { value: false, id: '17', label: 'Quốc tế' }, { value: false, id: '18', label: 'Vĩ mô' }, { value: false, id: '19', label: 'Startup' },
//         ],
//     },
//     {
//         parentCatId: 4,
//         subCat: [
//             { value: false, id: '20', label: 'Giới sao' }, { value: false, id: '21', label: 'Video' }, { value: false, id: '22', label: 'The Oscars' }, { value: false, id: '23', label: 'Phim' }, { value: false, id: '24', label: 'Nhạc' }, { value: false, id: '25', label: 'Thời trang' },
//             { value: false, id: '26', label: 'Làm đẹp' }, { value: false, id: '27', label: 'Truyền hình' }, { value: false, id: '28', label: 'Sách' }, { value: false, id: '29', label: 'Sân khấu - Mỹ thuật' }, { value: false, id: '30', label: 'Cộng đồng' }, { value: false, id: '31', label: 'Thư viện' },
//         ],
//     },
//     {
//         parentCatId: 5,
//         subCat: [
//             { value: false, id: '32', label: 'Video' }, { value: false, id: '33', label: 'Bóng đá' }, { value: false, id: '34', label: 'Tennis' }, { value: false, id: '35', label: 'Các môn khác' }, { value: false, id: '36', label: 'Hậu trường' },
//             { value: false, id: '37', label: 'Ảnh' }, { value: false, id: '38', label: 'Tường thuật' }, { value: false, id: '39', label: 'Lịch thi đấu' }, { value: false, id: '40', label: 'V-League' },
//         ],
//     },
//     {
//         parentCatId: 6,
//         subCat: [{ value: false, id: '41', label: 'Hồ sơ phá án' }, { value: false, id: '42', label: 'Tư vấn' }],
//     },
//     {
//         parentCatId: 7,
//         subCat: [
//             { value: false, id: '43', label: 'Tuyển sinh' }, { value: false, id: '44', label: 'Trắc nghiệm' }, { value: false, id: '45', label: 'Học Tiếng Anh' }, { value: false, id: '46', label: 'Du học' }, { value: false, id: '47', label: 'Giáo dục 4.0' },
//         ],
//     },
//     {
//         parentCatId: 8,
//         subCat: [
//             { value: false, id: '48', label: 'Tin tức' }, { value: false, id: '49', label: 'Các bệnh' }, { value: false, id: '50', label: 'Ung thư' }, { value: false, id: '51', label: 'Khỏe đẹp' }, { value: false, id: '52', label: 'Dinh dưỡng' },
//         ],
//     },
//     {
//         parentCatId: 9,
//         subCat: [
//             { value: false, id: '53', label: 'Tổ ấm' }, { value: false, id: '54', label: 'Lối sống' }, { value: false, id: '55', label: 'Nhà' }, { value: false, id: '56', label: 'Tiêu dùng' },
//         ],
//     },
//     {
//         parentCatId: 10,
//         subCat: [
//             { value: false, id: '57', label: 'Viet nam' }, { value: false, id: '58', label: 'Quốc tế' }, { value: false, id: '59', label: 'Dấu chân' }, { value: false, id: '60', label: 'Tư vấn' }, { value: false, id: '61', label: 'Ảnh' }, { value: false, id: '62', label: 'Cẩm nang' },
//         ],
//     },
//     {
//         parentCatId: 11,
//         subCat: [
//             { value: false, id: '63', label: 'Trong nước' }, { value: false, id: '64', label: 'Giải mã' }, { value: false, id: '65', label: 'Thường thức' }, { value: false, id: '66', label: 'Chuyện lạ' }, { value: false, id: '67', label: 'Hỏi - Đáp' },
//         ],
//     },
//     {
//         parentCatId: 12,
//         subCat: [
//             { value: false, id: '68', label: 'Đời sống số' }, { value: false, id: '69', label: 'Sản phẩm' }, { value: false, id: '70', label: 'Điện tử gia dụng' }, { value: false, id: '71', label: 'Kinh nghiệm' }, { value: false, id: '72', label: 'Video' }, { value: false, id: '73', label: 'Galaxy s10' },
//         ],
//     },
//     {
//         parentCatId: 13,
//         subCat: [
//             { value: false, id: '74', label: 'Tư vấn' }, { value: false, id: '75', label: 'Bảng giá' }, { value: false, id: '76', label: 'Thị trường' }, { value: false, id: '77', label: 'Diễn đàn' }, { value: false, id: '78', label: 'Mua-Bán' }, { value: false, id: '79', label: 'Thi bằng lái' },
//         ],
//     },
//     {
//         parentCatId: 14,
//         subCat: [
//             { value: false, id: '80', label: 'Chuyên gia gỡ rối' }, { value: false, id: '81', label: 'Hẹn hò' },
//         ],
//     },
//     {
//         parentCatId: 15,
//         subCat: [
//             { value: false, id: '82', label: 'Ảnh' }, { value: false, id: '83', label: 'Tiểu phẩm' }, { value: false, id: '84', label: 'Video' },
//         ]
//     }
// ]
export default PostService;