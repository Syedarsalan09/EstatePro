
/* =========================================================
   ESTATEPRO - LOCAL STORAGE MANAGEMENT
   File: js/storage.js
   ========================================================= */

const STORAGE_KEYS = {
    users: "estatepro_users",
    currentUser: "estatepro_current_user",
    favorites: "estatepro_favorites",
    properties: "estatepro_user_properties",
    contacts: "estatepro_contact_messages",
    newsletter: "estatepro_newsletter",
    inquiries: "estatepro_inquiries",
    admin: "estatepro_admin",
    recentlyViewed: "estatepro_recently_viewed"
};


/* ---------- Safe LocalStorage helpers ---------- */

const Storage = {
    get(key, fallback = null) {
        try {
            const value = localStorage.getItem(key);

            if (value === null) {
                return fallback;
            }

            return JSON.parse(value);
        } catch (error) {
            console.error(`EstatePro storage read error (${key}):`, error);
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`EstatePro storage write error (${key}):`, error);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`EstatePro storage remove error (${key}):`, error);
            return false;
        }
    },

    clear() {
        try {
            Object.values(STORAGE_KEYS).forEach((key) => {
                localStorage.removeItem(key);
            });

            return true;
        } catch (error) {
            console.error("EstatePro storage clear error:", error);
            return false;
        }
    }
};


/* ---------- Initialize default application data ---------- */

function initializeStorage() {
    const defaults = [
        [STORAGE_KEYS.users, []],
        [STORAGE_KEYS.favorites, []],
        [STORAGE_KEYS.properties, []],
        [STORAGE_KEYS.contacts, []],
        [STORAGE_KEYS.newsletter, []],
        [STORAGE_KEYS.inquiries, []],
        [STORAGE_KEYS.recentlyViewed, []]
    ];

    defaults.forEach(([key, defaultValue]) => {
        if (localStorage.getItem(key) === null) {
            Storage.set(key, defaultValue);
        }
    });

    // Demo admin account.
    // This is for local demonstration only, not secure production authentication.
    if (!localStorage.getItem(STORAGE_KEYS.admin)) {
        Storage.set(STORAGE_KEYS.admin, {
            email: "admin@estatepro.in",
            password: "Admin@123",
            name: "EstatePro Admin",
            role: "admin"
        });
    }
}


/* ---------- User storage ---------- */

const UserStorage = {
    getAll() {
        return Storage.get(STORAGE_KEYS.users, []);
    },

    findByEmail(email) {
        if (!email) return null;

        const normalizedEmail = email.trim().toLowerCase();

        return this.getAll().find(
            (user) => user.email.toLowerCase() === normalizedEmail
        ) || null;
    },

    findById(id) {
        return this.getAll().find((user) => user.id === id) || null;
    },

    add(user) {
        const users = this.getAll();

        const exists = users.some(
            (item) => item.email.toLowerCase() === user.email.toLowerCase()
        );

        if (exists) {
            return {
                success: false,
                message: "An account with this email already exists."
            };
        }

        users.push(user);

        const saved = Storage.set(STORAGE_KEYS.users, users);

        return saved
            ? { success: true, user }
            : { success: false, message: "Unable to save user information." };
    },

    update(id, updates) {
        const users = this.getAll();
        const index = users.findIndex((user) => user.id === id);

        if (index === -1) {
            return false;
        }

        users[index] = {
            ...users[index],
            ...updates,
            id: users[index].id,
            email: users[index].email
        };

        return Storage.set(STORAGE_KEYS.users, users);
    },

    delete(id) {
        const users = this.getAll().filter((user) => user.id !== id);

        return Storage.set(STORAGE_KEYS.users, users);
    }
};


/* ---------- Current user session ---------- */

const SessionStorage = {
    getCurrentUser() {
        return Storage.get(STORAGE_KEYS.currentUser, null);
    },

    setCurrentUser(user) {
        if (!user) return false;

        // Never store the password in the active session.
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            role: user.role || "user",
            createdAt: user.createdAt || new Date().toISOString()
        };

        return Storage.set(STORAGE_KEYS.currentUser, safeUser);
    },

    isLoggedIn() {
        return Boolean(this.getCurrentUser());
    },

    isAdmin() {
        const user = this.getCurrentUser();
        return Boolean(user && user.role === "admin");
    },

    logout() {
        Storage.remove(STORAGE_KEYS.currentUser);
    }
};


/* ---------- Favorite properties ---------- */

const FavoriteStorage = {
    getAll() {
        return Storage.get(STORAGE_KEYS.favorites, []);
    },

    getByUser(userId) {
        if (!userId) return [];

        return this.getAll().filter(
            (favorite) => favorite.userId === userId
        );
    },

    isFavorite(propertyId, userId) {
        if (!userId) return false;

        return this.getAll().some(
            (favorite) =>
                favorite.propertyId === propertyId &&
                favorite.userId === userId
        );
    },

    add(propertyId, userId) {
        if (!propertyId || !userId) {
            return {
                success: false,
                message: "Please log in to save properties."
            };
        }

        if (this.isFavorite(propertyId, userId)) {
            return {
                success: false,
                message: "Property is already in your favorites."
            };
        }

        const favorites = this.getAll();

        favorites.push({
            id: `FAV-${Date.now()}`,
            propertyId,
            userId,
            createdAt: new Date().toISOString()
        });

        const saved = Storage.set(STORAGE_KEYS.favorites, favorites);

        return saved
            ? { success: true, message: "Property added to favorites." }
            : { success: false, message: "Unable to save favorite." };
    },

    remove(propertyId, userId) {
        const favorites = this.getAll().filter(
            (favorite) =>
                !(
                    favorite.propertyId === propertyId &&
                    favorite.userId === userId
                )
        );

        return Storage.set(STORAGE_KEYS.favorites, favorites);
    },

    toggle(propertyId, userId) {
        if (this.isFavorite(propertyId, userId)) {
            this.remove(propertyId, userId);

            return {
                success: true,
                isFavorite: false,
                message: "Removed from favorites."
            };
        }

        const result = this.add(propertyId, userId);

        return {
            ...result,
            isFavorite: result.success
        };
    }
};


/* ---------- User-posted properties ---------- */

const PropertyStorage = {
    getAll() {
        return Storage.get(STORAGE_KEYS.properties, []);
    },

    getByUser(userId) {
        return this.getAll().filter(
            (property) => property.ownerId === userId
        );
    },

    findById(id) {
        return this.getAll().find(
            (property) => property.id === id
        ) || null;
    },

    add(property) {
        const properties = this.getAll();

        properties.unshift(property);

        const saved = Storage.set(STORAGE_KEYS.properties, properties);

        return saved
            ? { success: true, property }
            : { success: false, message: "Unable to save property." };
    },

    update(id, updates) {
        const properties = this.getAll();
        const index = properties.findIndex(
            (property) => property.id === id
        );

        if (index === -1) return false;

        properties[index] = {
            ...properties[index],
            ...updates,
            id: properties[index].id
        };

        return Storage.set(STORAGE_KEYS.properties, properties);
    },

    delete(id, userId = null) {
        const properties = this.getAll();

        const filtered = properties.filter((property) => {
            if (property.id !== id) return true;

            // If a user ID is supplied, only allow the owner to delete.
            if (userId && property.ownerId !== userId) return true;

            return false;
        });

        return Storage.set(STORAGE_KEYS.properties, filtered);
    }
};


/* ---------- Contact messages ---------- */

const ContactStorage = {
    getAll() {
        return Storage.get(STORAGE_KEYS.contacts, []);
    },

    add(message) {
        const messages = this.getAll();

        const newMessage = {
            id: `MSG-${Date.now()}`,
            ...message,
            status: "new",
            createdAt: new Date().toISOString()
        };

        messages.unshift(newMessage);

        const saved = Storage.set(STORAGE_KEYS.contacts, messages);

        return saved
            ? { success: true, message: newMessage }
            : { success: false, message: "Unable to save contact message." };
    },

    updateStatus(id, status) {
        const messages = this.getAll();
        const index = messages.findIndex((item) => item.id === id);

        if (index === -1) return false;

        messages[index].status = status;

        return Storage.set(STORAGE_KEYS.contacts, messages);
    },

    delete(id) {
        const messages = this.getAll().filter(
            (message) => message.id !== id
        );

        return Storage.set(STORAGE_KEYS.contacts, messages);
    }
};


/* ---------- Newsletter subscriptions ---------- */

const NewsletterStorage = {
    getAll() {
        return Storage.get(STORAGE_KEYS.newsletter, []);
    },

    subscribe(email) {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            return {
                success: false,
                message: "Please enter your email address."
            };
        }

        const subscribers = this.getAll();

        const exists = subscribers.some(
            (item) => item.email === normalizedEmail
        );

        if (exists) {
            return {
                success: false,
                message: "You are already subscribed."
            };
        }

        subscribers.push({
            id: `NEWS-${Date.now()}`,
            email: normalizedEmail,
            subscribedAt: new Date().toISOString()
        });

        const saved = Storage.set(STORAGE_KEYS.newsletter, subscribers);

        return saved
            ? { success: true, message: "Successfully subscribed!" }
            : { success: false, message: "Unable to save subscription." };
    }
};


/* ---------- Property inquiries ---------- */

const InquiryStorage = {
    getAll() {
        return Storage.get(STORAGE_KEYS.inquiries, []);
    },

    getByUser(userId) {
        return this.getAll().filter(
            (inquiry) => inquiry.userId === userId
        );
    },

    add(inquiry) {
        const inquiries = this.getAll();

        const newInquiry = {
            id: `INQ-${Date.now()}`,
            ...inquiry,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        inquiries.unshift(newInquiry);

        const saved = Storage.set(STORAGE_KEYS.inquiries, inquiries);

        return saved
            ? { success: true, inquiry: newInquiry }
            : { success: false, message: "Unable to save inquiry." };
    },

    updateStatus(id, status) {
        const inquiries = this.getAll();
        const index = inquiries.findIndex(
            (inquiry) => inquiry.id === id
        );

        if (index === -1) return false;

        inquiries[index].status = status;

        return Storage.set(STORAGE_KEYS.inquiries, inquiries);
    }
};


/* ---------- Recently viewed properties ---------- */

const RecentlyViewedStorage = {
    getAll() {
        return Storage.get(STORAGE_KEYS.recentlyViewed, []);
    },

    add(propertyId) {
        if (!propertyId) return false;

        let viewed = this.getAll();

        viewed = viewed.filter((id) => id !== propertyId);
        viewed.unshift(propertyId);

        // Keep only the latest 10 viewed properties.
        viewed = viewed.slice(0, 10);

        return Storage.set(STORAGE_KEYS.recentlyViewed, viewed);
    },

    clear() {
        return Storage.set(STORAGE_KEYS.recentlyViewed, []);
    }
};


/* ---------- Initialize storage when loaded ---------- */

initializeStorage();


/* ---------- Make storage services globally available ---------- */

window.STORAGE_KEYS = STORAGE_KEYS;
window.Storage = Storage;
window.UserStorage = UserStorage;
window.SessionStorage = SessionStorage;
window.FavoriteStorage = FavoriteStorage;
window.PropertyStorage = PropertyStorage;
window.ContactStorage = ContactStorage;
window.NewsletterStorage = NewsletterStorage;
window.InquiryStorage = InquiryStorage;
window.RecentlyViewedStorage = RecentlyViewedStorage;
