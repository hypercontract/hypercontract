import { Order, OrderStatus } from '../../app/orders/order.model';

export const orderMocks: Order[] = [
    {
        _id: '0222eb58-4cd5-4486-bd05-e639c76d5c6d',
        orderDate: '2019-04-11T21:03:32.182Z',
        orderStatus: OrderStatus.Processing,
        orderItems: [
            {
                productName: 'Handcrafted Fresh Shoes',
                productDescription: 'Ut ea explicabo sequi non enim et. Possimus est dolore ut deserunt praesentium. Ea officia velit debitis. Sunt quia deserunt nostrum. Est porro veniam accusantium impedit nihil facere.',
                price: 43.04,
                quantity: 1
            },
            {
                productName: 'Tasty Rubber Tuna',
                productDescription: 'Fuga assumenda iusto provident sapiente atque sed soluta. Est illum sint tempore omnis vitae ut vero quia est. Eum delectus atque excepturi modi tenetur.',
                price: 65.05,
                quantity: 3
            },
            {
                productName: 'Fantastic Wooden Chair',
                productDescription: 'Repellendus dolores vel natus. Quo qui id minus nisi non libero. In eum eos animi quasi. Voluptatem exercitationem suscipit voluptas commodi aut quas est eaque.',
                price: 15.25,
                quantity: 1
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: '1b69fd20-c343-4259-8e99-1bb8e35d2a3d',
        orderDate: '2019-05-20T23:54:42.747Z',
        orderStatus: OrderStatus.Processing,
        orderItems: [
            {
                productName: 'Gorgeous Cotton Towels',
                productDescription: 'Ipsa consequatur vitae consectetur provident explicabo id sit earum. Odit ipsam consectetur. Laudantium occaecati animi. Exercitationem consequatur voluptatum quo eveniet accusamus nemo.',
                price: 43.82,
                quantity: 2
            },
            {
                productName: 'Licensed Steel Pizza',
                productDescription: 'Consequatur ipsa amet laudantium et aut velit doloremque. Ipsam placeat quisquam hic reiciendis doloremque nulla maxime aut. Autem voluptatum veniam iusto minus sint velit praesentium consequatur hic. Consectetur libero accusantium est. Cum aut sit quia molestiae sequi in deserunt alias. Qui suscipit delectus est neque non ut architecto et in.',
                price: 97.85000000000001,
                quantity: 5
            }
        ],
        billingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        shippingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        payment: {
            accountOwner: 'Tyrese Kshlerin',
            iban: 'PT94797506530440095307778',
            bic: 'PZIUWFX1'
        }
    },
    {
        _id: '2749da89-ea85-4424-befd-5d133952cd1f',
        orderDate: '2019-04-05T10:08:07.554Z',
        orderStatus: OrderStatus.Processing,
        orderItems: [
            {
                productName: 'Practical Granite Ball',
                productDescription: 'Labore impedit non aspernatur incidunt eum. Non ut nostrum. Provident dicta eligendi ducimus commodi quis harum et ex earum. Veritatis molestias aut qui voluptate non voluptatem laudantium et. Quibusdam quaerat dolor beatae vel asperiores. Occaecati ipsum esse eaque molestiae ut.',
                price: 66.08,
                quantity: 4
            },
            {
                productName: 'Practical Granite Ball',
                productDescription: 'Labore impedit non aspernatur incidunt eum. Non ut nostrum. Provident dicta eligendi ducimus commodi quis harum et ex earum. Veritatis molestias aut qui voluptate non voluptatem laudantium et. Quibusdam quaerat dolor beatae vel asperiores. Occaecati ipsum esse eaque molestiae ut.',
                price: 66.08,
                quantity: 2
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: '554d5ae3-bb7f-439d-a3bd-6e51033614b6',
        orderDate: '2019-08-03T12:15:40.275Z',
        orderStatus: OrderStatus.Cancelled,
        orderItems: [
            {
                productName: 'Licensed Steel Pizza',
                productDescription: 'Consequatur ipsa amet laudantium et aut velit doloremque. Ipsam placeat quisquam hic reiciendis doloremque nulla maxime aut. Autem voluptatum veniam iusto minus sint velit praesentium consequatur hic. Consectetur libero accusantium est. Cum aut sit quia molestiae sequi in deserunt alias. Qui suscipit delectus est neque non ut architecto et in.',
                price: 97.85000000000001,
                quantity: 2
            },
            {
                productName: 'Sleek Granite Gloves',
                productDescription: 'Dolorem et error. Repellat dolorum quisquam non sed. Magni et ad magni distinctio facilis tempora repellat quod et. Et sint magni aperiam accusamus. Et est quia explicabo aut reprehenderit et et sunt.',
                price: 13.75,
                quantity: 4
            }
        ],
        billingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        shippingAddress: {
            name: 'Lucious Jacobson',
            street: '46253 Adolphus Viaduct',
            zipCode: '93062-6148',
            city: 'Chloestad',
            country: 'French Southern Territories'
        },
        payment: {
            accountOwner: 'Tyrese Kshlerin',
            iban: 'PT94797506530440095307778',
            bic: 'PZIUWFX1'
        }
    },
    {
        _id: '57b7adac-b49e-429a-b16c-dc46682992f1',
        orderDate: '2019-04-30T05:20:24.027Z',
        orderStatus: OrderStatus.Processing,
        orderItems: [
            {
                productName: 'Generic Steel Chicken',
                productDescription: 'Ad sit numquam enim ea earum nemo ut qui impedit. Reprehenderit quia recusandae at at aliquam. Ut amet ipsa aut dolores.',
                price: 77.8,
                quantity: 2
            },
            {
                productName: 'Awesome Cotton Pizza',
                productDescription: 'Nihil deleniti repellat est corporis earum et. Voluptas aut vel repellat. Ut beatae ut dolorem a debitis perspiciatis dolorem. Illum sed id expedita dolorem laudantium. Sed repudiandae a accusamus autem vero sit fuga velit blanditiis.',
                price: 30.72,
                quantity: 4
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Lucious Jacobson',
            street: '46253 Adolphus Viaduct',
            zipCode: '93062-6148',
            city: 'Chloestad',
            country: 'French Southern Territories'
        },
        payment: {
            accountOwner: 'Tyrese Kshlerin',
            iban: 'PT94797506530440095307778',
            bic: 'PZIUWFX1'
        }
    },
    {
        _id: '5889dc44-e6eb-4d90-be39-47770b35be66',
        orderDate: '2019-04-26T02:52:47.628Z',
        orderStatus: OrderStatus.Cancelled,
        orderItems: [
            {
                productName: 'Generic Steel Chicken',
                productDescription: 'Ad sit numquam enim ea earum nemo ut qui impedit. Reprehenderit quia recusandae at at aliquam. Ut amet ipsa aut dolores.',
                price: 77.8,
                quantity: 5
            },
            {
                productName: 'Unbranded Cotton Mouse',
                productDescription: 'Aspernatur odio provident. Unde velit quia sunt labore ea. Eum sint optio et veniam eos quos deleniti quaerat repellendus.',
                price: 72.49,
                quantity: 4
            },
            {
                productName: 'Rustic Plastic Chicken',
                productDescription: 'Consequatur reiciendis consequatur asperiores facilis omnis veniam vel non. Dolor quam vel ipsam id optio consequatur ut voluptates perferendis. Adipisci itaque provident maxime sit dolore sed sed ipsam. Ex sed in et deserunt veritatis voluptatum reiciendis architecto. Tenetur exercitationem eum.',
                price: 8.24,
                quantity: 3
            }
        ],
        billingAddress: {
            name: 'Lucious Jacobson',
            street: '46253 Adolphus Viaduct',
            zipCode: '93062-6148',
            city: 'Chloestad',
            country: 'French Southern Territories'
        },
        shippingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: '58c9c7db-30b9-472a-af4f-ee2da509252f',
        orderDate: '2019-01-31T05:34:18.345Z',
        orderStatus: OrderStatus.Delivered,
        orderItems: [
            {
                productName: 'Small Fresh Gloves',
                productDescription: 'Pariatur nobis sed et doloribus quia. Esse eaque nobis consequatur eligendi neque sed iusto illo non. Necessitatibus dolore ut nemo ratione aliquam ut eum consequatur. Deserunt assumenda tempora. Beatae aliquid explicabo est et.',
                price: 28.740000000000002,
                quantity: 4
            },
            {
                productName: 'Fantastic Cotton Chair',
                productDescription: 'Sint ut quaerat id. Libero maxime nesciunt fugit deserunt natus eos autem fuga molestiae. Quisquam et voluptatibus et quia neque sapiente dolorem. Culpa numquam illo.',
                price: 60.910000000000004,
                quantity: 4
            },
            {
                productName: 'Ergonomic Frozen Chicken',
                productDescription: 'Rerum iure aut modi minus. Cupiditate facilis in cupiditate cumque nesciunt. Voluptatibus laborum excepturi consequatur beatae laborum pariatur enim commodi.',
                price: 86.74,
                quantity: 4
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Lucious Jacobson',
            street: '46253 Adolphus Viaduct',
            zipCode: '93062-6148',
            city: 'Chloestad',
            country: 'French Southern Territories'
        },
        payment: {
            accountOwner: 'Tyrese Kshlerin',
            iban: 'PT94797506530440095307778',
            bic: 'PZIUWFX1'
        }
    },
    {
        _id: '5c04f26f-4cf5-4ccb-bcaa-9495f8a45149',
        orderDate: '2019-10-31T12:38:37.613Z',
        orderStatus: OrderStatus.Cancelled,
        orderItems: [
            {
                productName: 'Fantastic Wooden Chair',
                productDescription: 'Repellendus dolores vel natus. Quo qui id minus nisi non libero. In eum eos animi quasi. Voluptatem exercitationem suscipit voluptas commodi aut quas est eaque.',
                price: 15.25,
                quantity: 5
            },
            {
                productName: 'Handcrafted Fresh Shoes',
                productDescription: 'Ut ea explicabo sequi non enim et. Possimus est dolore ut deserunt praesentium. Ea officia velit debitis. Sunt quia deserunt nostrum. Est porro veniam accusantium impedit nihil facere.',
                price: 43.04,
                quantity: 2
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: '69c89364-9936-437f-95bd-82cc8cf03613',
        orderDate: '2019-07-09T11:44:01.288Z',
        orderStatus: OrderStatus.Delivered,
        orderItems: [
            {
                productName: 'Tasty Rubber Tuna',
                productDescription: 'Fuga assumenda iusto provident sapiente atque sed soluta. Est illum sint tempore omnis vitae ut vero quia est. Eum delectus atque excepturi modi tenetur.',
                price: 65.05,
                quantity: 2
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        payment: {
            accountOwner: 'Tyrese Kshlerin',
            iban: 'PT94797506530440095307778',
            bic: 'PZIUWFX1'
        }
    },
    {
        _id: '7e0c2437-6fe5-4e56-bb7b-d08e9e42e32e',
        orderDate: '2019-06-10T15:27:12.675Z',
        orderStatus: OrderStatus.Delivered,
        orderItems: [
            {
                productName: 'Gorgeous Cotton Gloves',
                productDescription: 'Est optio a et. Ducimus sint et. Molestiae ut iste culpa. Eos laboriosam iste voluptatem deleniti adipisci qui sunt.',
                price: 68.49,
                quantity: 1
            },
            {
                productName: 'Ergonomic Frozen Chicken',
                productDescription: 'Rerum iure aut modi minus. Cupiditate facilis in cupiditate cumque nesciunt. Voluptatibus laborum excepturi consequatur beatae laborum pariatur enim commodi.',
                price: 86.74,
                quantity: 2
            }
        ],
        billingAddress: {
            name: 'Lucious Jacobson',
            street: '46253 Adolphus Viaduct',
            zipCode: '93062-6148',
            city: 'Chloestad',
            country: 'French Southern Territories'
        },
        shippingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: '86e9d411-487e-41db-bfc2-40bfd1103b5f',
        orderDate: '2019-02-27T13:22:50.917Z',
        orderStatus: OrderStatus.Processing,
        orderItems: [
            {
                productName: 'Incredible Soft Pants',
                productDescription: 'Consequatur accusantium saepe nulla exercitationem amet voluptatem aliquam exercitationem eveniet. Alias ut qui sunt alias corrupti mollitia nulla. Dolor eos iusto maxime omnis sunt voluptas ut.',
                price: 80.54,
                quantity: 2
            }
        ],
        billingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        shippingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: '922c79c8-57e5-426b-bb11-dd7c407cb4a1',
        orderDate: '2019-08-15T22:29:57.648Z',
        orderStatus: OrderStatus.Processing,
        orderItems: [
            {
                productName: 'Sleek Granite Gloves',
                productDescription: 'Dolorem et error. Repellat dolorum quisquam non sed. Magni et ad magni distinctio facilis tempora repellat quod et. Et sint magni aperiam accusamus. Et est quia explicabo aut reprehenderit et et sunt.',
                price: 13.75,
                quantity: 4
            },
            {
                productName: 'Fantastic Wooden Chair',
                productDescription: 'Repellendus dolores vel natus. Quo qui id minus nisi non libero. In eum eos animi quasi. Voluptatem exercitationem suscipit voluptas commodi aut quas est eaque.',
                price: 15.25,
                quantity: 2
            },
            {
                productName: 'Gorgeous Fresh Sausages',
                productDescription: 'Ducimus voluptas ea sint ea necessitatibus est quam suscipit. Dignissimos facere ut. Molestias veniam sed omnis sit.',
                price: 23.73,
                quantity: 4
            }
        ],
        billingAddress: {
            name: 'Lucious Jacobson',
            street: '46253 Adolphus Viaduct',
            zipCode: '93062-6148',
            city: 'Chloestad',
            country: 'French Southern Territories'
        },
        shippingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: '946c6afe-9083-4010-91f5-fd8d1bbeda80',
        orderDate: '2019-07-05T02:07:56.482Z',
        orderStatus: OrderStatus.Cancelled,
        orderItems: [
            {
                productName: 'Awesome Cotton Pizza',
                productDescription: 'Nihil deleniti repellat est corporis earum et. Voluptas aut vel repellat. Ut beatae ut dolorem a debitis perspiciatis dolorem. Illum sed id expedita dolorem laudantium. Sed repudiandae a accusamus autem vero sit fuga velit blanditiis.',
                price: 30.72,
                quantity: 5
            },
            {
                productName: 'Handcrafted Fresh Shoes',
                productDescription: 'Ut ea explicabo sequi non enim et. Possimus est dolore ut deserunt praesentium. Ea officia velit debitis. Sunt quia deserunt nostrum. Est porro veniam accusantium impedit nihil facere.',
                price: 43.04,
                quantity: 4
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: '9969a73f-3275-427a-8af1-94cfcc80964e',
        orderDate: '2019-07-16T08:56:23.458Z',
        orderStatus: OrderStatus.Delivered,
        orderItems: [
            {
                productName: 'Handcrafted Fresh Shoes',
                productDescription: 'Ut ea explicabo sequi non enim et. Possimus est dolore ut deserunt praesentium. Ea officia velit debitis. Sunt quia deserunt nostrum. Est porro veniam accusantium impedit nihil facere.',
                price: 43.04,
                quantity: 2
            },
            {
                productName: 'Gorgeous Cotton Towels',
                productDescription: 'Ipsa consequatur vitae consectetur provident explicabo id sit earum. Odit ipsam consectetur. Laudantium occaecati animi. Exercitationem consequatur voluptatum quo eveniet accusamus nemo.',
                price: 43.82,
                quantity: 3
            }
        ],
        billingAddress: {
            name: 'Lucious Jacobson',
            street: '46253 Adolphus Viaduct',
            zipCode: '93062-6148',
            city: 'Chloestad',
            country: 'French Southern Territories'
        },
        shippingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        payment: {
            accountOwner: 'Tyrese Kshlerin',
            iban: 'PT94797506530440095307778',
            bic: 'PZIUWFX1'
        }
    },
    {
        _id: 'a78afcfb-fe0d-4048-9355-18b780802eff',
        orderDate: '2019-06-25T05:11:24.155Z',
        orderStatus: OrderStatus.Processing,
        orderItems: [
            {
                productName: 'Refined Cotton Fish',
                productDescription: 'Aut ut dolorem eaque blanditiis laborum recusandae esse voluptatem quisquam. Et nam impedit sequi sit quas ratione. Quia modi molestias qui enim et nulla. Et enim iste veritatis quasi consequatur. Omnis consequuntur asperiores tenetur.',
                price: 69.82000000000001,
                quantity: 1
            },
            {
                productName: 'Generic Steel Chicken',
                productDescription: 'Ad sit numquam enim ea earum nemo ut qui impedit. Reprehenderit quia recusandae at at aliquam. Ut amet ipsa aut dolores.',
                price: 77.8,
                quantity: 5
            }
        ],
        billingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        shippingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: 'b02278a5-b40a-44fe-b77a-0a7df4d5a5fb',
        orderDate: '2018-12-15T07:50:11.871Z',
        orderStatus: OrderStatus.Processing,
        orderItems: [
            {
                productName: 'Sleek Steel Cheese',
                productDescription: 'Amet rerum est consequatur quasi qui quisquam eum optio qui. Asperiores beatae non accusantium. Quidem quae reiciendis ad voluptatem fugiat aut sit qui. Ut perferendis tempore.',
                price: 31.1,
                quantity: 4
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: 'c104374d-5ad6-4b46-bfe2-a507da5e96e4',
        orderDate: '2019-04-22T11:12:46.517Z',
        orderStatus: OrderStatus.Delivered,
        orderItems: [
            {
                productName: 'Awesome Cotton Pizza',
                productDescription: 'Nihil deleniti repellat est corporis earum et. Voluptas aut vel repellat. Ut beatae ut dolorem a debitis perspiciatis dolorem. Illum sed id expedita dolorem laudantium. Sed repudiandae a accusamus autem vero sit fuga velit blanditiis.',
                price: 30.72,
                quantity: 4
            },
            {
                productName: 'Rustic Soft Pizza',
                productDescription: 'Officiis molestiae quisquam voluptas corrupti. Voluptatem autem delectus sit exercitationem vel qui id maxime. Sapiente unde aliquid autem aliquid beatae. Esse consequatur dolores voluptatem sequi accusamus sunt. Quia eius sed aut doloremque praesentium. Quo mollitia voluptatum eos voluptatem voluptatem sunt quis praesentium magni.',
                price: 92.92,
                quantity: 4
            },
            {
                productName: 'Tasty Granite Bacon',
                productDescription: 'Ut eaque recusandae alias quisquam officiis aperiam maxime qui ratione. Expedita est modi saepe fuga voluptate incidunt. Facilis sed et vel nostrum architecto quisquam. Aut ea ea necessitatibus nisi non. Consequuntur est voluptatem id voluptate. Et doloremque blanditiis est voluptatem dolorum.',
                price: 48.95,
                quantity: 3
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Lucious Jacobson',
            street: '46253 Adolphus Viaduct',
            zipCode: '93062-6148',
            city: 'Chloestad',
            country: 'French Southern Territories'
        },
        payment: {
            accountOwner: 'Tyrese Kshlerin',
            iban: 'PT94797506530440095307778',
            bic: 'PZIUWFX1'
        }
    },
    {
        _id: 'cf0f6018-f632-4d15-a72b-7c5d185d4eff',
        orderDate: '2019-02-05T23:59:45.337Z',
        orderStatus: OrderStatus.Processing,
        orderItems: [
            {
                productName: 'Generic Steel Chicken',
                productDescription: 'Ad sit numquam enim ea earum nemo ut qui impedit. Reprehenderit quia recusandae at at aliquam. Ut amet ipsa aut dolores.',
                price: 77.8,
                quantity: 1
            }
        ],
        billingAddress: {
            name: 'Nick Kunze',
            street: '1728 Hubert Circles',
            zipCode: '52561',
            city: 'East Ahmad',
            country: 'Argentina'
        },
        shippingAddress: {
            name: 'Lucious Jacobson',
            street: '46253 Adolphus Viaduct',
            zipCode: '93062-6148',
            city: 'Chloestad',
            country: 'French Southern Territories'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: 'da8653e5-efed-4891-929b-b97274f85101',
        orderDate: '2019-01-28T04:24:16.857Z',
        orderStatus: OrderStatus.Delivered,
        orderItems: [
            {
                productName: 'Gorgeous Cotton Towels',
                productDescription: 'Ipsa consequatur vitae consectetur provident explicabo id sit earum. Odit ipsam consectetur. Laudantium occaecati animi. Exercitationem consequatur voluptatum quo eveniet accusamus nemo.',
                price: 43.82,
                quantity: 5
            },
            {
                productName: 'Sleek Steel Cheese',
                productDescription: 'Amet rerum est consequatur quasi qui quisquam eum optio qui. Asperiores beatae non accusantium. Quidem quae reiciendis ad voluptatem fugiat aut sit qui. Ut perferendis tempore.',
                price: 31.1,
                quantity: 5
            },
            {
                productName: 'Incredible Soft Pants',
                productDescription: 'Consequatur accusantium saepe nulla exercitationem amet voluptatem aliquam exercitationem eveniet. Alias ut qui sunt alias corrupti mollitia nulla. Dolor eos iusto maxime omnis sunt voluptas ut.',
                price: 80.54,
                quantity: 2
            }
        ],
        billingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        shippingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    },
    {
        _id: 'fa8d54fc-df19-42d9-a961-fd814f022250',
        orderDate: '2019-09-14T08:43:08.262Z',
        orderStatus: OrderStatus.Cancelled,
        orderItems: [
            {
                productName: 'Rustic Soft Pizza',
                productDescription: 'Officiis molestiae quisquam voluptas corrupti. Voluptatem autem delectus sit exercitationem vel qui id maxime. Sapiente unde aliquid autem aliquid beatae. Esse consequatur dolores voluptatem sequi accusamus sunt. Quia eius sed aut doloremque praesentium. Quo mollitia voluptatum eos voluptatem voluptatem sunt quis praesentium magni.',
                price: 92.92,
                quantity: 3
            },
            {
                productName: 'Small Frozen Sausages',
                productDescription: 'Non odio sed et architecto id vel eveniet dolorum cum. Laborum aliquam est. At accusantium velit ut earum et. Alias quidem non explicabo rem adipisci quis reprehenderit.',
                price: 79.27,
                quantity: 1
            }
        ],
        billingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        shippingAddress: {
            name: 'Tremayne Murphy',
            street: '92405 Parisian Land',
            zipCode: '54409',
            city: 'Roelmouth',
            country: 'Mexico'
        },
        payment: {
            accountOwner: 'Jacynthe Raynor',
            iban: 'FR169900215050KW4Q8S2175236',
            bic: 'BMCIMFJ1CIS'
        }
    }
];

export const orderMock = orderMocks[5];
export const orderMockId = orderMock._id;
