export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
            // badge: {
            //     variant: 'info',
            //     text: 'NEW',
            // },
        },
        {
            divider: true,
        },
        {
            name: 'Quản lý',
            url: '/manage',
            icon: 'fa fa-gears',
            children: [
                {
                    name: 'Đầu báo',
                    url: '/manage/publishers',
                    icon: 'fa fa-address-card-o',
                },
                {
                    name: 'Bài đăng',
                    url: '/manage/posts',
                    icon: 'fa fa-newspaper-o',
                },
                {
                    name: 'Chuyên mục',
                    url: '/manage/categories',
                    icon: 'fa fa-list-alt',
                },
                {
                    name: 'Chuyên mục con',
                    url: '/manage/subcategories',
                    icon: 'fa fa-list-ul',
                },
                
            ],
        },
        {
            divider: true,
        },
        {
            title: true,
            name: 'Extras',
        },        
        {
            name: 'Disabled',
            url: '/dashboard',
            icon: 'icon-ban',
            attributes: { disabled: true },
        }
    ],
};
