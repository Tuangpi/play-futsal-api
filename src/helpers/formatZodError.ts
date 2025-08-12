import { ZodError } from "zod";

export function formatZodError(error: ZodError) {
    const formattedErrors = error.issues.reduce((acc, issue) => {
        const path = issue.path.join('.') || 'unknown';
        if (!acc[path]) acc[path] = [];
        acc[path].push(issue.message);
        return acc;
    }, {} as Record<string, string[]>);

    return {
        success: false,
        message: "Validation error",
        errors: formattedErrors,
    };
}
