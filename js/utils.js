/**
 * Utility Functions
 * Common helper functions used across the application
 */

const Utils = {
    /**
     * Format timestamp to readable date string
     */
    formatDate: function(timestamp) {
        return new Date(timestamp).toLocaleString();
    },
    
    /**
     * Validate image file
     */
    validateImage: function(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        return validTypes.includes(file.type);
    },
    
    /**
     * Debounce function
     */
    debounce: function(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },
    
    /**
     * Throttle function
     */
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Deep clone object
     */
    deepClone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    /**
     * Check if element is in viewport
     */
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    /**
     * Generate unique ID
     */
    generateUniqueId: function() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    }
};
