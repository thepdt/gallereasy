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
                        {
                            name: 'Bảo trì ứng dụng',
                            url: '/manage/versions/configApp',
                            icon: 'fa fa-wrench',
                        },
                    ]
                },
                {
                    name: 'Minigame',
                    url: '/manage/minigame',
                    icon: 'fa fa-gamepad',
                    children: [
                        
                        {
                            name: 'Giải thưởng',
                            url: '/manage/minigame/award',
                            icon: 'fa fa-gift',
                        },
                        {
                            name: 'Thẻ nạp điện thoại',
                            url: '/manage/minigame/cardphone',
                            icon: 'fa fa-credit-card',
                        },
                        {
                            name: 'Nhà mạng',
                            url: '/manage/minigame/network',
                            icon: 'fa fa-volume-control-phone',
                        },

                    ]
                },
            ],
        }
    ],
};
