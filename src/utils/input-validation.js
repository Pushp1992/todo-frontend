
export const validateCreatePayload = (payload) => {
    return Object.values(payload).includes('');
};