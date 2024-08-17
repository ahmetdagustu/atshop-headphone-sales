import { reviews } from './reviews.js';

export const products = [
  {
    id: 1,
    name: "JBL E55BT KEY BLACK",
    price: 386,
    originalPrice: 451,
    brand: "JBL",
    category: "Wireless",
    color: "Black",
    rating: 4.2,
    image: "images/image1.webp",
    image2: "images/image1_2.webp",
    image3: "images/image1_3.webp",
    description: "The JBL E55BT KEY BLACK offers powerful bass and long battery life. Enjoy a comfortable wireless listening experience with excellent sound quality.",
    onSale: true,
    microphone: true,
    unitsSold: 2452,
    favorited: 14652,
    uploadDate: "2022-10-05",
    reviewCount: reviews.find(review => review.id === 1)?.customers.length || 0,
  },
  {
    id: 2,
    name: "JBL JR 310BT",
    price: 532,
    originalPrice: 600,
    brand: "Sony",
    category: "Wireless",
    color: "Blue",
    rating: 4.3,
    image: "images/image2.webp",
    image2: "images/image2_2.webp",
    image3: "images/image2_3.webp",
    description: "Designed for kids, the JBL JR 310BT features a comfortable and secure fit. Ideal for extended listening with durable and safe materials.",
    onSale: true,
    microphone: false,
    unitsSold: 6685,
    favorited: 15966,
    uploadDate: "2022-12-22",
    reviewCount: reviews.find(review => review.id === 2)?.customers.length || 0,
  },
  {
    id: 3,
    name: "JBL TUNE 750BTNC",
    price: 1128,
    originalPrice: 1200,
    brand: "Logitech",
    category: "Over-ear headphone",
    color: "Red",
    rating: 4.6,
    image: "images/image3.webp",
    image2: "images/image3_2.webp",
    image3: "images/image3_3.webp",
    description: "The JBL TUNE 750BTNC provides active noise cancellation and a long-lasting battery for uninterrupted music enjoyment with superior sound quality.",
    onSale: true,
    microphone: true,
    unitsSold: 9944,
    favorited: 58376,
    uploadDate: "2023-05-02",
    reviewCount: reviews.find(review => review.id === 3)?.customers.length || 0,
  },
  {
    id: 4,
    name: "JBL Horizon",
    price: 380,
    originalPrice: 400,
    brand: "Sony",
    category: "Wireless",
    color: "Black",
    rating: 4.1,
    image: "images/image4.webp",
    image2: "images/image4_2.webp",
    image3: "images/image4_3.webp",
    description: "The JBL Horizon features a sleek design with impressive sound quality. Ideal for a stylish and functional wireless audio experience.",
    onSale: true,
    microphone: true,
    unitsSold: 4211,
    favorited: 98976,
    uploadDate: "2023-08-12",
    reviewCount: reviews.find(review => review.id === 4)?.customers.length || 0,
  },
  {
    id: 5,
    name: "JBL Tune 220TWS",
    price: 620,
    originalPrice: 650,
    brand: "Beat",
    category: "In-ear headphone",
    color: "Pink",
    rating: 3.9,
    image: "images/image5.webp",
    image2: "images/image5_2.webp",
    image3: "images/image5_3.webp",
    description: "The JBL Tune 220TWS offers a stylish design with reliable wireless performance. Enjoy comfortable, high-quality sound with a trendy pink finish.",
    onSale: true,
    microphone: false,
    unitsSold: 6939,
    favorited: 89158,
    uploadDate: "2023-04-06",
    reviewCount: reviews.find(review => review.id === 5)?.customers.length || 0,
  },
  {
    id: 6,
    name: "UA Project Rock",
    price: 1500,
    originalPrice: 1600,
    brand: "Samsung",
    category: "Sport headphone",
    color: "Black",
    rating: 4.8,
    image: "images/image6.webp",
    image2: "images/image6_2.webp",
    image3: "images/image6_3.webp",
    description: "The UA Project Rock delivers exceptional sound and durability for intense workouts. Designed for athletes with premium materials and great fit.",
    onSale: true,
    microphone: true,
    unitsSold: 2829,
    favorited: 31032,
    uploadDate: "2024-07-21",
    reviewCount: reviews.find(review => review.id === 6)?.customers.length || 0,
  },
  {
    id: 7,
    name: "JBL Endurance RUN",
    price: 380,
    originalPrice: 400,
    brand: "Logitech",
    category: "Sport headphone",
    color: "Yellow",
    rating: 4.1,
    image: "images/image7.webp",
    image2: "images/image7_2.webp",
    image3: "images/image7_3.webp",
    description: "The JBL Endurance RUN features a secure fit and sweatproof design, perfect for intense workouts. Enjoy high-quality sound and durability.",
    onSale: true,
    microphone: false,
    unitsSold: 2426,
    favorited: 27972,
    uploadDate: "2023-01-13",
    reviewCount: reviews.find(review => review.id === 7)?.customers.length || 0,
  },
  {
    id: 8,
    name: "JBL LIVE 650BTNC",
    price: 1960,
    originalPrice: 2000,
    brand: "Logitech",
    category: "Over-ear headphone",
    color: "Blue",
    rating: 4.9,
    image: "images/image1.webp",
    image2: "images/image1_2.webp",
    image3: "images/image1_3.webp",
    description: "The JBL LIVE 650BTNC offers premium sound with active noise cancellation and long battery life. Perfect for immersive listening experiences.",
    onSale: true,
    microphone: true,
    unitsSold: 2778,
    favorited: 71807,
    uploadDate: "2024-02-03",
    reviewCount: reviews.find(review => review.id === 8)?.customers.length || 0,
  },
  {
    id: 9,
    name: "JBL Reflect Flow",
    price: 760,
    originalPrice: 800,
    brand: "Sony",
    category: "Wireless",
    color: "Black",
    rating: 4.0,
    image: "images/image2.webp",
    image2: "images/image2_2.webp",
    image3: "images/image2_3.webp",
    description: "The JBL Reflect Flow offers secure fit and sweatproof features, making it ideal for workouts. Enjoy a durable design with good sound quality.",
    onSale: true,
    microphone: false,
    unitsSold: 3107,
    favorited: 34836,
    uploadDate: "2024-05-30",
    reviewCount: reviews.find(review => review.id === 9)?.customers.length || 0,
  },
  {
    id: 10,
    name: "JBL Free X",
    price: 950,
    originalPrice: 1000,
    brand: "Beat",
    category: "Wireless",
    color: "White",
    rating: 4.6,
    image: "images/image3.webp",
    image2: "images/image3_2.webp",
    image3: "images/image3_3.webp",
    description: "The JBL Free X features true wireless freedom with excellent sound quality and a sleek white design. Enjoy a hassle-free listening experience.",
    onSale: false,
    microphone: true,
    unitsSold: 7386,
    favorited: 78349,
    uploadDate: "2023-06-22",
    reviewCount: reviews.find(review => review.id === 10)?.customers.length || 0,
  },
  {
    id: 11,
    name: "JBL E55BT KEY BLACK",
    price: 380,
    originalPrice: 400,
    brand: "Logitech",
    category: "In-ear headphone",
    color: "Black",
    rating: 4.5,
    image: "images/image4.webp",
    image2: "images/image4_2.webp",
    image3: "images/image4_3.webp",
    description: "Enjoy powerful sound and long battery life with the JBL E55BT KEY BLACK. Its wireless connectivity offers a comfortable and immersive experience.",
    onSale: true,
    microphone: true,
    unitsSold: 9861,
    favorited: 77124,
    uploadDate: "2022-11-22",
    reviewCount: reviews.find(review => review.id === 11)?.customers.length || 0,
  },
  {
    id: 12,
    name: "JBL JR 310BT",
    price: 490,
    originalPrice: 500,
    brand: "Samsung",
    category: "Wireless",
    color: "Blue",
    rating: 4.0,
    image: "images/image5.webp",
    image2: "images/image5_2.webp",
    image3: "images/image5_3.webp",
    description: "The JBL JR 310BT is perfect for kids with its comfortable fit and durable design. Enjoy safe and enjoyable wireless listening with these headphones.",
    onSale: true,
    microphone: false,
    unitsSold: 2417,
    favorited: 48902,
    uploadDate: "2023-05-02",
    reviewCount: reviews.find(review => review.id === 12)?.customers.length || 0,
  },
  {
    id: 13,
    name: "JBL TUNE 750BTNC",
    price: 1280,
    originalPrice: 1300,
    brand: "JBL",
    category: "Over-ear headphone",
    color: "Red",
    rating: 4.7,
    image: "images/image6.webp",
    image2: "images/image6_2.webp",
    image3: "images/image6_3.webp",
    description: "Experience premium sound with active noise cancellation in the JBL TUNE 750BTNC. Ideal for enjoying uninterrupted music with enhanced clarity.",
    onSale: true,
    microphone: true,
    unitsSold: 4330,
    favorited: 20023,
    uploadDate: "2022-11-23",
    reviewCount: reviews.find(review => review.id === 13)?.customers.length || 0,
  },
  {
    id: 14,
    name: "JBL Horizon",
    price: 460,
    originalPrice: 500,
    brand: "Sony",
    category: "Wireless",
    color: "Black",
    rating: 4.2,
    image: "images/image7.webp",
    image2: "images/image7_2.webp",
    image3: "images/image7_3.webp",
    description: "The JBL Horizon combines style with functionality, offering a sleek design and high-quality sound for a premium wireless audio experience.",
    onSale: true,
    microphone: true,
    unitsSold: 7361,
    favorited: 23556,
    uploadDate: "2023-11-07",
    reviewCount: reviews.find(review => review.id === 14)?.customers.length || 0,
  },
  {
    id: 15,
    name: "JBL Tune 220TWS",
    price: 720,
    originalPrice: 750,
    brand: "Beat",
    category: "In-ear headphone",
    color: "Pink",
    rating: 3.8,
    image: "images/image1.webp",
    image2: "images/image1_2.webp",
    image3: "images/image1_3.webp",
    description: "The JBL Tune 220TWS features a chic pink design with true wireless capabilities. Enjoy a comfortable fit and clear sound with this stylish model.",
    onSale: true,
    microphone: false,
    unitsSold: 9650,
    favorited: 36212,
    uploadDate: "2022-09-08",
    reviewCount: reviews.find(review => review.id === 15)?.customers.length || 0,
  },
  {
    id: 16,
    name: "UA Project Rock",
    price: 1550,
    originalPrice: 1600,
    brand: "Logitech",
    category: "Sport headphone",
    color: "Black",
    rating: 4.8,
    image: "images/image2.webp",
    image2: "images/image2_2.webp",
    image3: "images/image2_3.webp",
    description: "Designed for athletes, the UA Project Rock delivers outstanding sound quality and durability. Built with premium materials for intense workouts.",
    onSale: false,
    microphone: true,
    unitsSold: 7447,
    favorited: 72192,
    uploadDate: "2023-07-28",
    reviewCount: reviews.find(review => review.id === 16)?.customers.length || 0,
  },
  {
    id: 17,
    name: "JBL Endurance RUN",
    price: 380,
    originalPrice: 400,
    brand: "JBL",
    category: "Sport headphone",
    color: "Yellow",
    rating: 4.2,
    image: "images/image3.webp",
    image2: "images/image3_2.webp",
    image3: "images/image3_3.webp",
    description: "The JBL Endurance RUN features a secure fit and sweatproof design, ideal for rigorous workouts. Enjoy reliable sound and durability in a vibrant yellow.",
    onSale: true,
    microphone: false,
    unitsSold: 4415,
    favorited: 40155,
    uploadDate: "2023-09-02",
    reviewCount: reviews.find(review => review.id === 17)?.customers.length || 0,
  },
  {
    id: 18,
    name: "JBL LIVE 650BTNC",
    price: 1900,
    originalPrice: 2000,
    brand: "Sony",
    category: "Over-ear headphone",
    color: "Blue",
    rating: 4.8,
    image: "images/image4.webp",
    image2: "images/image4_2.webp",
    image3: "images/image4_3.webp",
    description: "The JBL LIVE 650BTNC offers high-quality sound and effective noise cancellation for an immersive listening experience. Sleek design and long-lasting battery.",
    onSale: true,
    microphone: true,
    unitsSold: 2322,
    favorited: 30447,
    uploadDate: "2022-09-29",
    reviewCount: reviews.find(review => review.id === 18)?.customers.length || 0,
  },
  {
    id: 19,
    name: "JBL Reflect Flow",
    price: 760,
    originalPrice: 800,
    brand: "Beat",
    category: "Wireless",
    color: "Black",
    rating: 4.1,
    image: "images/image5.webp",
    image2: "images/image5_2.webp",
    image3: "images/image5_3.webp",
    description: "Enjoy a secure fit and durability with the JBL Reflect Flow. Perfect for workouts, with good sound quality and a sweatproof design.",
    onSale: true,
    microphone: false,
    unitsSold: 5466,
    favorited: 12372,
    uploadDate: "2023-11-19",
    reviewCount: reviews.find(review => review.id === 19)?.customers.length || 0,
  },
  {
    id: 20,
    name: "JBL Free X",
    price: 950,
    originalPrice: 1000,
    brand: "Logitech",
    category: "In-ear headphone",
    color: "White",
    rating: 4.7,
    image: "images/image6.webp",
    image2: "images/image6_2.webp",
    image3: "images/image6_3.webp",
    description: "The JBL Free X offers true wireless convenience with excellent sound quality. Enjoy a hassle-free listening experience in a stylish white design.",
    onSale: true,
    microphone: true,
    unitsSold: 8173,
    favorited: 93868,
    uploadDate: "2024-04-21",
    reviewCount: reviews.find(review => review.id === 20)?.customers.length || 0,
  },
  {
    id: 21,
    name: "JBL E55BT KEY BLACK",
    price: 390,
    originalPrice: 420,
    brand: "Samsung",
    category: "Wireless",
    color: "Black",
    rating: 4.4,
    image: "images/image7.webp",
    image2: "images/image7_2.webp",
    image3: "images/image7_3.webp",
    description: "The JBL E55BT KEY BLACK combines excellent sound quality with a comfortable fit. Enjoy a powerful audio experience with long battery life and wireless convenience.",
    onSale: true,
    microphone: true,
    unitsSold: 4929,
    favorited: 65770,
    uploadDate: "2024-02-28",
    reviewCount: reviews.find(review => review.id === 21)?.customers.length || 0,
  },
  {
    id: 22,
    name: "JBL JR 310BT",
    price: 510,
    originalPrice: 540,
    brand: "JBL",
    category: "Wireless",
    color: "Blue",
    rating: 4.1,
    image: "images/image2.webp",
    image2: "images/image2_2.webp",
    image3: "images/image2_3.webp",
    description: "The JBL JR 310BT offers a comfortable and durable design for kids, providing safe and enjoyable wireless listening with vibrant sound quality.",
    onSale: true,
    microphone: false,
    unitsSold: 6108,
    favorited: 73335,
    uploadDate: "2023-09-11",
    reviewCount: reviews.find(review => review.id === 22)?.customers.length || 0,
  },
  {
    id: 23,
    name: "JBL TUNE 750BTNC",
    price: 1300,
    originalPrice: 1350,
    brand: "Beat",
    category: "In-ear headphone",
    color: "Red",
    rating: 4.8,
    image: "images/image3.webp",
    image2: "images/image3_2.webp",
    image3: "images/image3_3.webp",
    description: "Experience premium audio with the JBL TUNE 750BTNC, featuring active noise cancellation and a comfortable design for high-quality, uninterrupted listening.",
    onSale: true,
    microphone: true,
    unitsSold: 4298,
    favorited: 47856,
    uploadDate: "2023-10-15",
    reviewCount: reviews.find(review => review.id === 23)?.customers.length || 0,
  },
  {
    id: 24,
    name: "JBL Horizon",
    price: 470,
    originalPrice: 490,
    brand: "Beat",
    category: "Wireless",
    color: "Black",
    rating: 4.3,
    image: "images/image4.webp",
    image2: "images/image4_2.webp",
    image3: "images/image4_3.webp",
    description: "The JBL Horizon features an elegant design with excellent sound quality. Perfect for those who appreciate both style and functionality in their wireless audio.",
    onSale: false,
    microphone: true,
    unitsSold: 9669,
    favorited: 99326,
    uploadDate: "2023-04-12",
    reviewCount: reviews.find(review => review.id === 24)?.customers.length || 0,
  },
  {
    id: 25,
    name: "JBL Tune 220TWS",
    price: 730,
    originalPrice: 770,
    brand: "Beat",
    category: "In-ear headphone",
    color: "Pink",
    rating: 4.0,
    image: "images/image5.webp",
    image2: "images/image5_2.webp",
    image3: "images/image5_3.webp",
    description: "The JBL Tune 220TWS provides a stylish pink design with high-quality wireless sound. Enjoy comfort and clarity in a fashionable true wireless earbud.",
    onSale: true,
    microphone: false,
    unitsSold: 2319,
    favorited: 44864,
    uploadDate: "2023-12-07",
    reviewCount: reviews.find(review => review.id === 25)?.customers.length || 0,
  },
  {
    id: 26,
    name: "UA Project Rock",
    price: 1600,
    originalPrice: 1650,
    brand: "Beat",
    category: "Sport headphone",
    color: "Black",
    rating: 4.8,
    image: "images/image6.webp",
    image2: "images/image6_2.webp",
    image3: "images/image6_3.webp",
    description: "Built for athletes, the UA Project Rock offers exceptional sound and rugged durability. Ideal for intense workouts with a comfortable and secure fit.",
    onSale: true,
    microphone: true,
    unitsSold: 7923,
    favorited: 88663,
    uploadDate: "2023-02-13",
    reviewCount: reviews.find(review => review.id === 26)?.customers.length || 0,
  },
  {
    id: 27,
    name: "JBL Endurance RUN",
    price: 400,
    originalPrice: 430,
    brand: "Logitech",
    category: "Sport headphone",
    color: "Yellow",
    rating: 4.4,
    image: "images/image7.webp",
    image2: "images/image7_2.webp",
    image3: "images/image7_3.webp",
    description: "The JBL Endurance RUN is designed for athletes with a secure fit and sweatproof features. Enjoy reliable performance and clear sound during your workouts.",
    onSale: true,
    microphone: false,
    unitsSold: 4044,
    favorited: 34400,
    uploadDate: "2023-02-25",
    reviewCount: reviews.find(review => review.id === 27)?.customers.length || 0,
  },
  {
    id: 28,
    name: "JBL LIVE 650BTNC",
    price: 2000,
    originalPrice: 2200,
    brand: "JBL",
    category: "Over-ear headphone",
    color: "Blue",
    rating: 4.9,
    image: "images/image1.webp",
    image2: "images/image1_2.webp",
    image3: "images/image1_3.webp",
    description: "The JBL LIVE 650BTNC offers superior sound with active noise cancellation. Perfect for a premium audio experience with extended comfort and battery life.",
    onSale: true,
    microphone: true,
    unitsSold: 6463,
    favorited: 52397,
    uploadDate: "2023-11-05",
    reviewCount: reviews.find(review => review.id === 28)?.customers.length || 0,
  },
  {
    id: 29,
    name: "JBL Reflect Flow",
    price: 790,
    originalPrice: 850,
    brand: "Beat",
    category: "Wireless",
    color: "Black",
    rating: 4.3,
    image: "images/image2.webp",
    image2: "images/image2_2.webp",
    image3: "images/image2_3.webp",
    description: "The JBL Reflect Flow offers a secure fit and sweatproof durability, perfect for intense workouts. Enjoy high-quality sound and a rugged design.",
    onSale: true,
    microphone: false,
    unitsSold: 6353,
    favorited: 78493,
    uploadDate: "2024-03-27",
    reviewCount: reviews.find(review => review.id === 29)?.customers.length || 0,
  },
  {
    id: 30,
    name: "JBL Free X",
    price: 1000,
    originalPrice: 1050,
    brand: "Logitech",
    category: "Wireless",
    color: "White",
    rating: 4.7,
    image: "images/image3.webp",
    image2: "images/image3_2.webp",
    image3: "images/image3_3.webp",
    description: "The JBL Free X delivers true wireless freedom with a stylish white design and high-quality sound. Enjoy a seamless and enjoyable audio experience.",
    onSale: true,
    microphone: true,
    unitsSold: 5224,
    favorited: 86887,
    uploadDate: "2023-04-09",
    reviewCount: reviews.find(review => review.id === 30)?.customers.length || 0,
  },
  {
    id: 31,
    name: "JBL E55BT KEY BLACK",
    price: 400,
    originalPrice: 440,
    brand: "Beat",
    category: "WIn-ear headphone",
    color: "Black",
    rating: 4.5,
    image: "images/image4.webp",
    image2: "images/image4_2.webp",
    image3: "images/image4_3.webp",
    description: "The JBL E55BT KEY BLACK features powerful sound and a comfortable fit. Enjoy long battery life and wireless convenience with this stylish model.",
    onSale: true,
    microphone: true,
    unitsSold: 3941,
    favorited: 69200,
    uploadDate: "2024-03-31",
    reviewCount: reviews.find(review => review.id === 31)?.customers.length || 0,
  },
  {
    id: 32,
    name: "JBL JR 310BT",
    price: 530,
    originalPrice: 550,
    brand: "Beat",
    category: "In-ear headphone",
    color: "Blue",
    rating: 4.2,
    image: "images/image5.webp",
    image2: "images/image5_2.webp",
    image3: "images/image5_3.webp",
    description: "The JBL JR 310BT is designed for kids, offering a durable and comfortable fit with safe wireless listening and vibrant sound quality.",
    onSale: false,
    microphone: false,
    unitsSold: 9108,
    favorited: 63481,
    uploadDate: "2022-12-31",
    reviewCount: reviews.find(review => review.id === 32)?.customers.length || 0,
  },
  {
    id: 33,
    name: "JBL TUNE 750BTNC",
    price: 1250,
    originalPrice: 1400,
    brand: "JBL",
    category: "Over-ear headphone",
    color: "Red",
    rating: 4.6,
    image: "images/image6.webp",
    image2: "images/image6_2.webp",
    image3: "images/image6_3.webp",
    description: "The JBL TUNE 750BTNC offers exceptional sound with active noise cancellation. Enjoy long-lasting comfort and superior audio quality.",
    onSale: true,
    microphone: true,
    unitsSold: 9917,
    favorited: 95302,
    uploadDate: "2023-01-04",
    reviewCount: reviews.find(review => review.id === 33)?.customers.length || 0,
  },
  {
    id: 34,
    name: "JBL Horizon",
    price: 450,
    originalPrice: 500,
    brand: "Samsung",
    category: "In-ear headphone",
    color: "Black",
    rating: 4.4,
    image: "images/image7.webp",
    image2: "images/image7_2.webp",
    image3: "images/image7_3.webp",
    description: "The JBL Horizon combines elegance with excellent sound quality. Ideal for those who value both style and functionality in their wireless audio experience.",
    onSale: true,
    microphone: true,
    unitsSold: 7534,
    favorited: 61294,
    uploadDate: "2023-07-03",
    reviewCount: reviews.find(review => review.id === 34)?.customers.length || 0,
  },
  {
    id: 35,
    name: "JBL Tune 220TWS",
    price: 750,
    originalPrice: 800,
    brand: "Beat",
    category: "In-ear headphone",
    color: "Pink",
    rating: 4.1,
    image: "images/image1.webp",
    image2: "images/image1_2.webp",
    image3: "images/image1_3.webp",
    description: "The JBL Tune 220TWS provides a chic pink design with high-quality sound. Enjoy comfort and clarity with these stylish true wireless earbuds.",
    onSale: true,
    microphone: false,
    unitsSold: 5463,
    favorited: 29288,
    uploadDate: "2023-01-08",
    reviewCount: reviews.find(review => review.id === 35)?.customers.length || 0,
  },
  {
    id: 36,
    name: "UA Project Rock",
    price: 1650,
    originalPrice: 1700,
    brand: "Samsung",
    category: "Sport headphone",
    color: "Black",
    rating: 4.8,
    image: "images/image2.webp",
    image2: "images/image2_2.webp",
    image3: "images/image2_3.webp",
    description: "Built for athletes, the UA Project Rock offers robust sound and durability. Ideal for intense workouts with a comfortable and secure fit.",
    onSale: true,
    microphone: true,
    unitsSold: 9395,
    favorited: 46749,
    uploadDate: "2023-01-30",
    reviewCount: reviews.find(review => review.id === 36)?.customers.length || 0,
  },
  {
    id: 37,
    name: "JBL Endurance RUN",
    price: 420,
    originalPrice: 450,
    brand: "Beat",
    category: "Sport headphone",
    color: "Yellow",
    rating: 4.5,
    image: "images/image3.webp",
    image2: "images/image3_2.webp",
    image3: "images/image3_3.webp",
    description: "The JBL Endurance RUN is designed for athletes, featuring a secure fit and sweatproof features. Enjoy reliable performance and clear sound during your workouts.",
    onSale: true,
    microphone: false,
    unitsSold: 8670,
    favorited: 43845,
    uploadDate: "2023-11-11",
    reviewCount: reviews.find(review => review.id === 37)?.customers.length || 0,
  },
  {
    id: 38,
    name: "JBL LIVE 650BTNC",
    price: 2050,
    originalPrice: 2250,
    brand: "Logitech",
    category: "Over-ear headphone",
    color: "Blue",
    rating: 4.9,
    image: "images/image4.webp",
    image2: "images/image4_2.webp",
    image3: "images/image4_3.webp",
    description: "The JBL LIVE 650BTNC offers superior sound with active noise cancellation. Perfect for extended comfort and a premium audio experience.",
    onSale: true,
    microphone: true,
    unitsSold: 2483,
    favorited: 12523,
    uploadDate: "2023-05-11",
    reviewCount: reviews.find(review => review.id === 38)?.customers.length || 0,
  },
  {
    id: 39,
    name: "JBL Reflect Flow",
    price: 820,
    originalPrice: 880,
    brand: "Logitech",
    category: "In-ear headphone",
    color: "Black",
    rating: 4.4,
    image: "images/image5.webp",
    image2: "images/image5_2.webp",
    image3: "images/image5_3.webp",
    descriptin: "The JBL Reflect Flow is designed for active users with a secure fit and sweatproof durability. Enjoy high-quality sound and a rugged design.",
    onSale: true,
    microphone: false,
    unitsSold: 9238,
    favorited: 97334,
    uploadDate: "2023-03-29",
    reviewCount: reviews.find(review => review.id === 39)?.customers.length || 0,
  },
  {
    id: 40,
    name: "JBL Free X",
    price: 1050,
    originalPrice: 1100,
    brand: "Beat",
    category: "In-ear headphone",
    color: "White",
    rating: 4.8,
    image: "images/image6.webp",
    image2: "images/image6_2.webp",
    image3: "images/image6_3.webp",
    description: "The JBL Free X offers true wireless freedom with a sleek white design and high-quality sound. Enjoy an effortless and enjoyable listening experience.",
    onSale: true,
    microphone: true,
    unitsSold: 4508,
    favorited: 65245,
    uploadDate: "2023-08-16",
    reviewCount: reviews.find(review => review.id === 40)?.customers.length || 0,
  }
];
