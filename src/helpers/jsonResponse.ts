type JsonResponseOptions<T = unknown> = {
    success: boolean;
    message: string;
    data?: T;
    errors?: Record<string, string[]>;
    meta?: {
        currentPage?: number;
        perPage?: number;
        total?: number;
        [key: string]: unknown;
    };
};

export function jsonResponse<T>({
    success,
    message,
    data,
    errors,
    meta,
}: JsonResponseOptions<T>) {
    return {
        success,
        message,
        ...(data !== undefined && { data }),
        ...(errors && { errors }),
        ...(meta && { meta }),
    };
}
