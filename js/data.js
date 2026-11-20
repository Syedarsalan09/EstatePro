
/* =========================================================
   ESTATEPRO - WEBSITE DATA
   File: js/data.js
   ========================================================= */

/* ---------- Website configuration ---------- */

const SITE_CONFIG = {
    name: "EstatePro",
    tagline: "Find a place you'll love to call home.",
    currency: "INR",
    currencySymbol: "₹",
    supportEmail: "support@estatepro.in",
    supportPhone: "+91 98765 43210",
    defaultCity: "Varanasi",
    propertiesPerPage: 9
};


/* ---------- Property categories ---------- */

const PROPERTY_CATEGORIES = [
    {
        id: "apartment",
        name: "Apartments",
        description: "Modern apartments for comfortable living",
        icon: "building-2",
        count: 125
    },
    {
        id: "villa",
        name: "Villas",
        description: "Spacious villas with premium facilities",
        icon: "house",
        count: 86
    },
    {
        id: "independent-house",
        name: "Independent Houses",
        description: "Find your perfect independent home",
        icon: "home",
        count: 94
    },
    {
        id: "plot",
        name: "Residential Plots",
        description: "Build your dream property from scratch",
        icon: "map",
        count: 72
    },
    {
        id: "commercial",
        name: "Commercial",
        description: "Spaces for your growing business",
        icon: "building",
        count: 48
    },
    {
        id: "office",
        name: "Office Spaces",
        description: "Professional workspaces in prime areas",
        icon: "briefcase-business",
        count: 35
    }
];


/* ---------- Popular locations ---------- */

const POPULAR_LOCATIONS = [
    {
        id: "varanasi",
        name: "Varanasi",
        state: "Uttar Pradesh",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=85",
        propertyCount: 120
    },
    {
        id: "delhi",
        name: "New Delhi",
        state: "Delhi",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=85",
        propertyCount: 250
    },
    {
        id: "mumbai",
        name: "Mumbai",
        state: "Maharashtra",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=85",
        propertyCount: 310
    },
    {
        id: "bangalore",
        name: "Bangalore",
        state: "Karnataka",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=85",
        propertyCount: 185
    },
    {
        id: "lucknow",
        name: "Lucknow",
        state: "Uttar Pradesh",
        image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=85",
        propertyCount: 95
    },
    {
        id: "pune",
        name: "Pune",
        state: "Maharashtra",
        image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=900&q=85",
        propertyCount: 140
    }
];


/* ---------- Property listings ---------- */

const PROPERTIES = [
    {
        id: "EP1001",
        title: "Luxury Modern Apartment",
        slug: "luxury-modern-apartment",
        type: "apartment",
        listingType: "buy",
        category: "Residential",
        price: 8500000,
        priceLabel: "₹85 Lac",
        pricePerUnit: "₹7,083 / sq.ft.",
        bedrooms: 3,
        bathrooms: 3,
        area: 1200,
        areaUnit: "sq.ft.",
        furnishing: "Semi-Furnished",
        city: "Varanasi",
        state: "Uttar Pradesh",
        locality: "Sunderpur",
        address: "Sunderpur, Varanasi, Uttar Pradesh",
        pincode: "221005",
        description: "A beautifully designed modern apartment featuring spacious bedrooms, elegant interiors, a modular kitchen, and excellent connectivity to schools, hospitals, and shopping destinations.",
        features: [
            "Modular Kitchen",
            "Covered Parking",
            "Lift",
            "24/7 Security",
            "Power Backup",
            "Balcony"
        ],
        amenities: ["Swimming Pool", "Gym", "Clubhouse", "Garden"],
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
        featured: true,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-10-15",
        views: 1250,
        rating: 4.8
    },

    {
        id: "EP1002",
        title: "Premium Family Villa",
        slug: "premium-family-villa",
        type: "villa",
        listingType: "buy",
        category: "Residential",
        price: 18500000,
        priceLabel: "₹1.85 Cr",
        pricePerUnit: "₹9,250 / sq.ft.",
        bedrooms: 4,
        bathrooms: 4,
        area: 2000,
        areaUnit: "sq.ft.",
        furnishing: "Fully-Furnished",
        city: "Delhi",
        state: "Delhi",
        locality: "Dwarka",
        address: "Sector 12, Dwarka, New Delhi",
        pincode: "110075",
        description: "Experience premium living in this beautiful family villa with spacious interiors, a private garden, modern kitchen, and dedicated parking.",
        features: [
            "Private Garden",
            "Modular Kitchen",
            "Parking",
            "Security",
            "Terrace",
            "Power Backup"
        ],
        amenities: ["Garden", "Clubhouse", "Gym", "Security"],
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",
        featured: true,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-10-18",
        views: 980,
        rating: 4.9
    },

    {
        id: "EP1003",
        title: "Elegant City Apartment",
        slug: "elegant-city-apartment",
        type: "apartment",
        listingType: "rent",
        category: "Residential",
        price: 25000,
        priceLabel: "₹25,000 / month",
        pricePerUnit: "₹25 / sq.ft.",
        bedrooms: 2,
        bathrooms: 2,
        area: 1000,
        areaUnit: "sq.ft.",
        furnishing: "Fully-Furnished",
        city: "Mumbai",
        state: "Maharashtra",
        locality: "Andheri West",
        address: "Andheri West, Mumbai, Maharashtra",
        pincode: "400053",
        description: "A comfortable and stylish apartment in a well-connected Mumbai neighbourhood. Ideal for professionals and small families.",
        features: [
            "Fully Furnished",
            "Lift",
            "Parking",
            "Security",
            "Balcony",
            "Water Supply"
        ],
        amenities: ["Gym", "Garden", "Security"],
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
        featured: true,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-10-20",
        views: 870,
        rating: 4.7
    },

    {
        id: "EP1004",
        title: "Spacious Independent House",
        slug: "spacious-independent-house",
        type: "independent-house",
        listingType: "buy",
        category: "Residential",
        price: 12500000,
        priceLabel: "₹1.25 Cr",
        pricePerUnit: "₹6,250 / sq.ft.",
        bedrooms: 4,
        bathrooms: 3,
        area: 2000,
        areaUnit: "sq.ft.",
        furnishing: "Semi-Furnished",
        city: "Varanasi",
        state: "Uttar Pradesh",
        locality: "Mahmoorganj",
        address: "Mahmoorganj, Varanasi, Uttar Pradesh",
        pincode: "221010",
        description: "A spacious independent house in a peaceful residential neighbourhood. Perfect for a family looking for privacy and comfortable living.",
        features: [
            "Independent Parking",
            "Terrace",
            "Balcony",
            "Water Supply",
            "Modular Kitchen",
            "Garden Space"
        ],
        amenities: ["Nearby Market", "Hospital Nearby", "School Nearby"],
        images: [
            "https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&w=1000&q=85",
        featured: true,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-10-22",
        views: 760,
        rating: 4.6
    },

    {
        id: "EP1005",
        title: "Modern Office Workspace",
        slug: "modern-office-workspace",
        type: "office",
        listingType: "rent",
        category: "Commercial",
        price: 65000,
        priceLabel: "₹65,000 / month",
        pricePerUnit: "₹65 / sq.ft.",
        bedrooms: 0,
        bathrooms: 2,
        area: 1000,
        areaUnit: "sq.ft.",
        furnishing: "Semi-Furnished",
        city: "Bangalore",
        state: "Karnataka",
        locality: "Whitefield",
        address: "Whitefield, Bangalore, Karnataka",
        pincode: "560066",
        description: "A professional office workspace in a prime business location with excellent connectivity and modern facilities.",
        features: [
            "Conference Room",
            "Reception Area",
            "Power Backup",
            "Lift",
            "Parking",
            "Security"
        ],
        amenities: ["Internet Ready", "Cafeteria", "Meeting Rooms"],
        images: [
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
        featured: true,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-10-25",
        views: 690,
        rating: 4.8
    },

    {
        id: "EP1006",
        title: "Residential Plot in Prime Area",
        slug: "residential-plot-prime-area",
        type: "plot",
        listingType: "buy",
        category: "Residential",
        price: 4500000,
        priceLabel: "₹45 Lac",
        pricePerUnit: "₹3,000 / sq.ft.",
        bedrooms: 0,
        bathrooms: 0,
        area: 1500,
        areaUnit: "sq.ft.",
        furnishing: "Not Applicable",
        city: "Lucknow",
        state: "Uttar Pradesh",
        locality: "Gomti Nagar",
        address: "Gomti Nagar, Lucknow, Uttar Pradesh",
        pincode: "226010",
        description: "A residential plot in a developing and well-connected area. Suitable for building your dream home or a long-term investment.",
        features: [
            "Clear Road Access",
            "Residential Zone",
            "Electricity Nearby",
            "Water Connection",
            "Developed Locality"
        ],
        amenities: ["Nearby Market", "School Nearby", "Hospital Nearby"],
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",
        featured: false,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-10-27",
        views: 540,
        rating: 4.5
    },

    {
        id: "EP1007",
        title: "Luxury Sea View Apartment",
        slug: "luxury-sea-view-apartment",
        type: "apartment",
        listingType: "buy",
        category: "Residential",
        price: 22500000,
        priceLabel: "₹2.25 Cr",
        pricePerUnit: "₹15,000 / sq.ft.",
        bedrooms: 3,
        bathrooms: 3,
        area: 1500,
        areaUnit: "sq.ft.",
        furnishing: "Fully-Furnished",
        city: "Mumbai",
        state: "Maharashtra",
        locality: "Bandra West",
        address: "Bandra West, Mumbai, Maharashtra",
        pincode: "400050",
        description: "An elegant luxury apartment with premium interiors, stunning city views, and access to excellent lifestyle facilities.",
        features: [
            "Premium Interiors",
            "Sea View",
            "Modular Kitchen",
            "Parking",
            "High-Speed Lift",
            "Security"
        ],
        amenities: ["Swimming Pool", "Gym", "Clubhouse", "Concierge"],
        images: [
            "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=85",
        featured: true,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-10-28",
        views: 1450,
        rating: 4.9
    },

    {
        id: "EP1008",
        title: "Affordable Family Apartment",
        slug: "affordable-family-apartment",
        type: "apartment",
        listingType: "rent",
        category: "Residential",
        price: 15000,
        priceLabel: "₹15,000 / month",
        pricePerUnit: "₹15 / sq.ft.",
        bedrooms: 2,
        bathrooms: 2,
        area: 950,
        areaUnit: "sq.ft.",
        furnishing: "Unfurnished",
        city: "Varanasi",
        state: "Uttar Pradesh",
        locality: "Lanka",
        address: "Lanka, Varanasi, Uttar Pradesh",
        pincode: "221005",
        description: "A budget-friendly apartment in a convenient locality with easy access to educational institutions, markets, and public transport.",
        features: [
            "Balcony",
            "Water Supply",
            "Lift",
            "Parking",
            "Security"
        ],
        amenities: ["Nearby Market", "School Nearby", "Public Transport"],
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
        featured: false,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-10-29",
        views: 430,
        rating: 4.5
    },

    {
        id: "EP1009",
        title: "Premium Commercial Shop",
        slug: "premium-commercial-shop",
        type: "commercial",
        listingType: "buy",
        category: "Commercial",
        price: 9500000,
        priceLabel: "₹95 Lac",
        pricePerUnit: "₹9,500 / sq.ft.",
        bedrooms: 0,
        bathrooms: 1,
        area: 1000,
        areaUnit: "sq.ft.",
        furnishing: "Unfurnished",
        city: "Pune",
        state: "Maharashtra",
        locality: "Baner",
        address: "Baner, Pune, Maharashtra",
        pincode: "411045",
        description: "A commercial retail space in a busy locality, suitable for a showroom, retail store, or service business.",
        features: [
            "Main Road Facing",
            "High Visibility",
            "Parking",
            "Power Backup",
            "Security"
        ],
        amenities: ["Nearby Market", "Public Transport", "Parking"],
        images: [
            "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1000&q=85",
        featured: false,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-10-30",
        views: 510,
        rating: 4.6
    },

    {
        id: "EP1010",
        title: "Contemporary Luxury Villa",
        slug: "contemporary-luxury-villa",
        type: "villa",
        listingType: "rent",
        category: "Residential",
        price: 75000,
        priceLabel: "₹75,000 / month",
        pricePerUnit: "₹30 / sq.ft.",
        bedrooms: 4,
        bathrooms: 4,
        area: 2500,
        areaUnit: "sq.ft.",
        furnishing: "Fully-Furnished",
        city: "Bangalore",
        state: "Karnataka",
        locality: "Sarjapur Road",
        address: "Sarjapur Road, Bangalore, Karnataka",
        pincode: "560035",
        description: "A contemporary villa with spacious rooms, beautiful interiors, and premium amenities in a sought-after residential community.",
        features: [
            "Private Garden",
            "Modular Kitchen",
            "Parking",
            "Balcony",
            "Security",
            "Power Backup"
        ],
        amenities: ["Swimming Pool", "Gym", "Clubhouse", "Garden"],
        images: [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=85",
        featured: true,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-11-01",
        views: 820,
        rating: 4.8
    },

    {
        id: "EP1011",
        title: "Modern Residential Plot",
        slug: "modern-residential-plot",
        type: "plot",
        listingType: "buy",
        category: "Residential",
        price: 3200000,
        priceLabel: "₹32 Lac",
        pricePerUnit: "₹2,667 / sq.ft.",
        bedrooms: 0,
        bathrooms: 0,
        area: 1200,
        areaUnit: "sq.ft.",
        furnishing: "Not Applicable",
        city: "Varanasi",
        state: "Uttar Pradesh",
        locality: "Rohania",
        address: "Rohania, Varanasi, Uttar Pradesh",
        pincode: "221108",
        description: "A residential plot with good road connectivity and nearby facilities. An excellent opportunity to plan and construct a home.",
        features: [
            "Road Access",
            "Electricity Nearby",
            "Water Connection",
            "Residential Area"
        ],
        amenities: ["Nearby Market", "School Nearby"],
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",
        featured: false,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-11-03",
        views: 350,
        rating: 4.4
    },

    {
        id: "EP1012",
        title: "Corporate Office Space",
        slug: "corporate-office-space",
        type: "office",
        listingType: "rent",
        category: "Commercial",
        price: 45000,
        priceLabel: "₹45,000 / month",
        pricePerUnit: "₹45 / sq.ft.",
        bedrooms: 0,
        bathrooms: 2,
        area: 1000,
        areaUnit: "sq.ft.",
        furnishing: "Fully-Furnished",
        city: "Delhi",
        state: "Delhi",
        locality: "Connaught Place",
        address: "Connaught Place, New Delhi",
        pincode: "110001",
        description: "A well-maintained corporate office space in a prime commercial district, suitable for startups and established businesses.",
        features: [
            "Reception",
            "Conference Room",
            "Air Conditioning",
            "Lift",
            "Power Backup",
            "Security"
        ],
        amenities: ["Internet Ready", "Meeting Rooms", "Cafeteria"],
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
        ],
        coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85",
        featured: false,
        verified: true,
        status: "available",
        postedBy: "EstatePro Verified Agent",
        postedDate: "2026-11-05",
        views: 620,
        rating: 4.7
    }
];


/* ---------- Testimonials ---------- */

const TESTIMONIALS = [
    {
        id: 1,
        name: "Aarav Sharma",
        role: "Home Buyer",
        city: "Varanasi",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85",
        rating: 5,
        message: "EstatePro made finding our dream home so much easier. The property details were clear, and the overall experience was excellent."
    },
    {
        id: 2,
        name: "Priya Verma",
        role: "Property Owner",
        city: "Delhi",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=85",
        rating: 5,
        message: "I was able to showcase my property to interested buyers without any hassle. The platform is simple and professional."
    },
    {
        id: 3,
        name: "Rahul Mehta",
        role: "Tenant",
        city: "Mumbai",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=85",
        rating: 5,
        message: "The search filters helped me find a rental apartment within my budget. I would definitely recommend EstatePro."
    }
];


/* ---------- Homepage statistics ---------- */

const SITE_STATISTICS = [
    {
        id: "properties",
        value: 1200,
        suffix: "+",
        label: "Properties Listed"
    },
    {
        id: "customers",
        value: 850,
        suffix: "+",
        label: "Happy Customers"
    },
    {
        id: "cities",
        value: 25,
        suffix: "+",
        label: "Cities Covered"
    },
    {
        id: "agents",
        value: 150,
        suffix: "+",
        label: "Verified Agents"
    }
];


/* ---------- Property listing options ---------- */

const PROPERTY_TYPES = [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "independent-house", label: "Independent House" },
    { value: "plot", label: "Residential Plot" },
    { value: "commercial", label: "Commercial Space" },
    { value: "office", label: "Office Space" }
];

const FURNISHING_TYPES = [
    "Fully-Furnished",
    "Semi-Furnished",
    "Unfurnished"
];

const LISTING_TYPES = [
    { value: "buy", label: "Buy" },
    { value: "rent", label: "Rent" },
    { value: "commercial", label: "Commercial" }
];


/* ---------- Export data for browser scripts ---------- */

window.SITE_CONFIG = SITE_CONFIG;
window.PROPERTY_CATEGORIES = PROPERTY_CATEGORIES;
window.POPULAR_LOCATIONS = POPULAR_LOCATIONS;
window.PROPERTIES = PROPERTIES;
window.TESTIMONIALS = TESTIMONIALS;
window.SITE_STATISTICS = SITE_STATISTICS;
window.PROPERTY_TYPES = PROPERTY_TYPES;
window.FURNISHING_TYPES = FURNISHING_TYPES;
window.LISTING_TYPES = LISTING_TYPES;
