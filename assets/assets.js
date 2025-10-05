import gvb_logo from "./gvb_logo.jpg"
import happy_store from "./happy_store.webp"
import upload_area from "./upload_area.svg"
import hero_model_img from "./hero_model_img.png"
import hero_product_img1 from "./hero_product_img1.png"
import hero_product_img2 from "./hero_product_img2.png"
import product_img1 from "./product_img1.png"
import product_img2 from "./product_img2.png"
import product_img3 from "./product_img3.png"
import product_img4 from "./product_img4.png"
import product_img5 from "./product_img5.png"
import product_img6 from "./product_img6.png"
import product_img7 from "./product_img7.png"
import product_img8 from "./product_img8.png"
import product_img9 from "./product_img9.png"
import product_img10 from "./product_img10.png"
import product_img11 from "./product_img11.png"
import product_img12 from "./product_img12.png"
import { ClockFadingIcon, HeadsetIcon, Truck } from "lucide-react";
import profile_pic1 from "./profile_ind1.svg"
import profile_pic2 from "./profile_ind2.svg"
import profile_pic3 from "./profile_ind3.svg"

export const assets = {
    upload_area, hero_model_img,
    hero_product_img1, hero_product_img2, gvb_logo,
    product_img1, product_img2, product_img3, product_img4, product_img5, product_img6,
    product_img7, product_img8, product_img9, product_img10, product_img11, product_img12,
}

export const categories = ["Headphones", "Speakers", "Watch", "Earbuds", "Mouse", "Decoration","Camera","Laptops","Mobiles"];

export const dummyRatingsData = [
    { id: "rat_1", rating: 4.2, review: "Great sound for the price — bass is punchy and delivery in Mumbai was fast. Solid build and good clarity for movies and music.", user: { name: 'Virat Kohli', image: profile_pic1 }, productId: "prod_1", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Bluetooth Speakers', category:'Electronics', id:'prod_1'} },
    { id: "rat_2", rating: 5.0, review: "Excellent product — battery life is impressive and the customer support in Bangalore resolved my query quickly. Highly recommended for daily use.", user: { name: 'MS Dhoni', image: profile_pic2 }, productId: "prod_2", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Smart speaker gray', category:'Electronics', id:'prod_2'} },
    { id: "rat_3", rating: 4.1, review: "Good value for money. Soundstage is decent and delivery was on time to Chennai. Setup was straightforward.", user: { name: 'Rohit Sharma', image: profile_pic3 }, productId: "prod_3", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Smart watch white', category:'Watch', id:'prod_3'} },
    { id: "rat_4", rating: 5.0, review: "Amazing headphones — noise cancellation works well on trains. Great for travel and calls. Fast delivery to Pune.", user: { name: 'Sachin Tendulkar', image: profile_pic1 }, productId: "prod_4", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Wireless headphones', category:'Electronics', id:'prod_4'} },
    { id: "rat_5", rating: 4.3, review: "Sturdy build and easy pairing. Packaging was secure and delivery to Kolkata was smooth. Minor quirk with app, but overall satisfied.", user: { name: 'Sourav Ganguly', image: profile_pic2 }, productId: "prod_5", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Smart watch black', category:'Watch', id:'prod_5'} },
    { id: "rat_6", rating: 5.0, review: "Fantastic camera for the price. Clear night shots and delivery in Hyderabad was quicker than expected.", user: { name: 'Rahul Dravid', image: profile_pic3 }, productId: "prod_6", createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)', product: { name: 'Security Camera', category:'Camera', id:'prod_6'} },
]

export const dummyStoreData = {
    id: "store_1",
    userId: "user_1",
    name: "Happy Shop",
    description: "At Happy Shop, we believe shopping should be simple, smart, and satisfying. Whether you're hunting for the latest fashion trends, top-notch electronics, home essentials, or unique lifestyle products — we've got it all under one digital roof.",
    username: "happyshop",
    address: "3rd Floor, Happy Shop, New Building, 45 MG Road, Bengaluru, Karnataka, 560001, India",
    status: "approved",
    isActive: true,
    logo: happy_store,
    email: "happyshop@example.com",
    contact: "+0 1234567890",
    createdAt: "2025-09-04T09:04:16.189Z",
    updatedAt: "2025-09-04T09:04:44.273Z",
        user: {
            id: "user_31dOriXqC4TATvc0brIhlYbwwc5",
            name: "GVB",
            email: "gvb1@gmail.com",
            image: gvb_logo,
        }
}

export const productDummyData = [
    {
        id: "prod_1",
        name: "Modern table lamp",
        description: "Modern table lamp with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty. Enhance your audio experience with this earbuds. Indulge yourself in a world of pure sound with 50 hours of uninterrupted playtime. Equipped with the cutting-edge Zen Mode Tech ENC and BoomX Tech, prepare to be enthralled by a symphony of crystal-clear melodies.",
        mrp: 40,
        price: 29,
        images: [product_img1, product_img2, product_img3, product_img4],
        category: "Decoration",
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        rating: dummyRatingsData,
        createdAt: 'Sat Jul 29 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 29 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_2",
        name: "Smart speaker gray",
        description: "Smart speaker with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 50,
        price: 29,
        images: [product_img2],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Speakers",
        rating: dummyRatingsData,
        createdAt: 'Sat Jul 28 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 28 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_3",
        name: "Smart watch white",
        description: "Smart watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 60,
        price: 29,
        images: [product_img3],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Watch",
        rating: dummyRatingsData,
        createdAt: 'Sat Jul 27 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 27 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_4",
        name: "Wireless headphones",
        description: "Wireless headphones with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 70,
        price: 29,
        images: [product_img4],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Headphones",
        rating: dummyRatingsData,
        createdAt: 'Sat Jul 26 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 26 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_5",
        name: "Smart watch black",
        description: "Smart watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 49,
        price: 29,
        images: [product_img5],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Watch",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_6",
        name: "Security Camera",
        description: "Security Camera with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 59,
        price: 29,
        images: [product_img6],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Camera",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_7",
        name: "Smart Pen for iPad",
        description: "Smart Pen for iPad with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 89,
        price: 29,
        images: [product_img7],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Pen",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 24 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 24 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_8",
        name: "Home Theater",
        description: "Home Theater with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 99,
        price: 29,
        images: [product_img8],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Theater",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 23 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 23 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_9",
        name: "Apple Wireless Earbuds",
        description: "Apple Wireless Earbuds with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 89,
        price: 29,
        images: [product_img9],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Earbuds",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 22 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 22 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_10",
        name: "Apple Smart Watch",
        description: "Apple Smart Watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 179,
        price: 29,
        images: [product_img10],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Watch",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 21 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 21 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_11",
        name: "RGB Gaming Mouse",
        description: "RGB Gaming Mouse with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 39,
        price: 29,
        images: [product_img11],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Mouse",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 20 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 20 2025 14:51:25 GMT+0530 (India Standard Time)',
    },
    {
        id: "prod_12",
        name: "Smart Home Cleaner",
        description: "Smart Home Cleaner with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
        mrp: 199,
        price: 29,
        images: [product_img12],
        storeId: "seller_1",
        inStock: true,
        store: dummyStoreData,
        category: "Cleaner",
        rating: [...dummyRatingsData,...dummyRatingsData],
        createdAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)',
        updatedAt: 'Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)',
    }
];

export const ourSpecsData = [
    { title: "Free Shipping", description: "Enjoy fast, free delivery on every order no conditions, just reliable doorstep.", icon: Truck, accent: '#0EA5E9' },
    { title: "7 Days easy Return", description: "Change your mind? No worries. Return any item within 7 days.", icon: ClockFadingIcon, accent: '#FF8904' },
    { title: "24/7 Customer Support", description: "We're here for you. Get expert help with our customer support.", icon: HeadsetIcon, accent: '#05DF72' }
]

export const addressDummyData = {
    id: "addr_1",
    userId: "user_1",
    name: "Virat Kohli",
    email: "viratkohli18@gmail.com",
    street: "123, Arunachal Street",
    city: "New Delhi",
    state: "New Delhi",
    zip: "110001",
    country: "India",
    phone: "1234567890",
    createdAt: 'Sat Aug 2 2025 14:51:25 GMT+0530 (India Standard Time)',
}

export const couponDummyData = [
    { code: "NEW20", description: "20% Off for New Users", discount: 20, forNewUser: true, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:35:31.183Z" },
    { code: "NEW10", description: "10% Off for New Users", discount: 10, forNewUser: true, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:35:50.653Z" },
    { code: "OFF20", description: "20% Off for All Users", discount: 20, forNewUser: false, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:42:00.811Z" },
    { code: "OFF10", description: "10% Off for All Users", discount: 10, forNewUser: false, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:42:21.279Z" },
    { code: "PLUS10", description: "20% Off for Members", discount: 10, forNewUser: false, forMember: true, isPublic: false, expiresAt: "2027-03-06T00:00:00.000Z", createdAt: "2025-08-22T11:38:20.194Z" }
]

export const dummyUserData = {
    id: "user_31dQbH27HVtovbs13X2cmqefddM",
    name: "GVB",
    email: "gvb1@gmail.com",
    image: gvb_logo,
    cart: {}
}

export const orderDummyData = [
    {
        id: "cmemm75h5001jtat89016h1p3",
        total: 214.2,
        status: "DELIVERED",
        userId: "user_31dQbH27HVtovbs13X2cmqefddM",
        storeId: "cmemkqnzm000htat8u7n8cpte",
        addressId: "cmemm6g95001ftat8omv9b883",
        isPaid: false,
        paymentMethod: "COD",
        createdAt: "2025-08-22T09:15:03.929Z",
        updatedAt: "2025-08-22T09:15:50.723Z",
        isCouponUsed: true,
        coupon: dummyRatingsData[2],
        orderItems: [
            { orderId: "cmemm75h5001jtat89016h1p3", productId: "cmemlydnx0017tat8h3rg92hz", quantity: 1, price: 89, product: productDummyData[0], },
            { orderId: "cmemm75h5001jtat89016h1p3", productId: "cmemlxgnk0015tat84qm8si5v", quantity: 1, price: 149, product: productDummyData[1], }
        ],
        address: addressDummyData,
        user: dummyUserData
    },
    {
        id: "cmemm6jv7001htat8vmm3gxaf",
        total: 421.6,
        status: "DELIVERED",
        userId: "user_31dQbH27HVtovbs13X2cmqefddM",
        storeId: "cmemkqnzm000htat8u7n8cpte",
        addressId: "cmemm6g95001ftat8omv9b883",
        isPaid: false,
        paymentMethod: "COD",
        createdAt: "2025-08-22T09:14:35.923Z",
        updatedAt: "2025-08-22T09:15:52.535Z",
        isCouponUsed: true,
        coupon: couponDummyData[0],
        orderItems: [
            { orderId: "cmemm6jv7001htat8vmm3gxaf", productId: "cmemm1f3y001dtat8liccisar", quantity: 1, price: 229, product: productDummyData[2], },
            { orderId: "cmemm6jv7001htat8vmm3gxaf", productId: "cmemm0nh2001btat8glfvhry1", quantity: 1, price: 99, product: productDummyData[3], },
            { orderId: "cmemm6jv7001htat8vmm3gxaf", productId: "cmemlz8640019tat8kz7emqca", quantity: 1, price: 199, product: productDummyData[4], }
        ],
        address: addressDummyData,
        user: dummyUserData
    }
]

export const storesDummyData = [
    {
        id: "cmemkb98v0001tat8r1hiyxhn",
        userId: "user_31dOriXqC4TATvc0brIhlYbwwc5",
    name: "GVB",
    description: "GVB is the education marketplace where you can buy goodies related to coding and tech",
    username: "gvb",
    address: "Flat 5B, 123 Marine Drive, Mumbai, Maharashtra, 400002, India",
    status: "approved",
        isActive: true,
    logo: gvb_logo,
    email: "gvb@example.com",
        contact: "+0 1234567890",
        createdAt: "2025-08-22T08:22:16.189Z",
        updatedAt: "2025-08-22T08:22:44.273Z",
        user: dummyUserData,
    },
    {
        id: "cmemkqnzm000htat8u7n8cpte",
        userId: "user_31dQbH27HVtovbs13X2cmqefddM",
        name: "Happy Shop",
        description: "At Happy Shop, we believe shopping should be simple, smart, and satisfying. Whether you're hunting for the latest fashion trends, top-notch electronics, home essentials, or unique lifestyle products — we've got it all under one digital roof.",
        username: "happyshop",
    address: "3rd Floor, Happy Shop, New Building, 45 MG Road, Bengaluru, Karnataka, 560001, India",
        status: "approved",
        isActive: true,
        logo: happy_store,
        email: "happyshop@example.com",
        contact: "+0 123456789",
        createdAt: "2025-08-22T08:34:15.155Z",
        updatedAt: "2025-08-22T08:34:47.162Z",
        user: dummyUserData,
    }
]

export const dummyAdminDashboardData = {
    "orders": 6,
    "stores": 2,
    "products": 12,
    "revenue": "959.10",
    "allOrders": [
        { "createdAt": "2025-08-20T08:46:58.239Z", "total": 145.6 },
        { "createdAt": "2025-08-22T08:46:21.818Z", "total": 97.2 },
        { "createdAt": "2025-08-22T08:45:59.587Z", "total": 54.4 },
        { "createdAt": "2025-08-23T09:15:03.929Z", "total": 214.2 },
        { "createdAt": "2025-08-23T09:14:35.923Z", "total": 421.6 },
        { "createdAt": "2025-08-23T11:44:29.713Z", "total": 26.1 },
        { "createdAt": "2025-08-24T09:15:03.929Z", "total": 214.2 },
        { "createdAt": "2025-08-24T09:14:35.923Z", "total": 421.6 },
        { "createdAt": "2025-08-24T11:44:29.713Z", "total": 26.1 },
        { "createdAt": "2025-08-24T11:56:29.713Z", "total": 36.1 },
        { "createdAt": "2025-08-25T11:44:29.713Z", "total": 26.1 },
        { "createdAt": "2025-08-25T09:15:03.929Z", "total": 214.2 },
        { "createdAt": "2025-08-25T09:14:35.923Z", "total": 421.6 },
        { "createdAt": "2025-08-25T11:44:29.713Z", "total": 26.1 },
        { "createdAt": "2025-08-25T11:56:29.713Z", "total": 36.1 },
        { "createdAt": "2025-08-25T11:30:29.713Z", "total": 110.1 }
    ]
}

export const dummyStoreDashboardData = {
    "ratings": dummyRatingsData,
    "totalOrders": 2,
    "totalEarnings": 636,
    "totalProducts": 5
}