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
            name: 'Manage',
            url: '/manage',
            icon: 'icon-cursor',
            children: [
                {
                    name: 'Categories',
                    url: '/manage/categories',
                    icon: 'fa fa-list-alt',
                },
                {
                    name: 'Subcategories',
                    url: '/manage/subcategories',
                    icon: 'fa fa-list-alt',
                },
                {
                    name: 'Publishers',
                    url: '/manage/publishers',
                    icon: 'fa fa-list-alt',
                },
                {
                    name: 'Posts',
                    url: '/manage/posts',
                    icon: 'icon-book-open',
                }
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
