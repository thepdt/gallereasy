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
                    name: 'Chuyên mục',
                    url: '/manage/categories',
                    icon: 'fa fa-list-alt',
                },
                {
                    name: 'Chuyên mục con',
                    url: '/manage/subcategories',
                    icon: 'fa fa-list-ul',
                },
                {
                    name: 'Bài đăng',
                    url: '/manage/posts',
                    icon: 'fa fa-newspaper-o',
                },
                {
                    name: 'Hot Trends',
                    url: '/manage/hotTrends',
                    icon: 'fa fa-newspaper-o',
                },
                {
                    name: 'Hot News',
                    url: '/manage/hotNews',
                    icon: 'fa fa-newspaper-o',
                },
                {
                    name: 'Phiên bản',
                    url: '/manage/versions',
                    icon: 'fa fa-code-fork',
                    children: [
                        {
                            name: 'Android',
                            url: '/manage/versions/android',
                            icon: 'fa fa-android',
                        },
                        {
                            name: 'IOS',
                            url: '/manage/versions/ios',
                            icon: 'fa fa-apple',
                        },
                    ]
                },
            ],
        }
    ],
};
