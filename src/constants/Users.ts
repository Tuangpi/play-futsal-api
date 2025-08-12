export const USER_ROLES = {
    OWNER: "OWNER",
    PLAYER: "PLAYER",
    HOSTER: "HOST",
} as const;

export type USER_ROLE = typeof USER_ROLES[keyof typeof USER_ROLES];
