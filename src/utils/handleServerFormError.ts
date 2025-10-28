/* eslint-disable @typescript-eslint/no-explicit-any */

export function handleServerError(form: any, error: any) {
    const status = error?.status;
    const data = error?.data;

    // Laravel 422 validation errors
    if (status === 422 && data?.errors && typeof data.errors === "object") {
        Object.entries(data.errors).forEach(([field, messages]) => {
            const firstMsg = Array.isArray(messages) ? messages[0] : String(messages);

            // If the field exists in RHF schema, set error directly
            if (field in form.getValues()) {
                form.setError(field, { type: "server", message: firstMsg });
            } else {
                // Unknown field -> set as root-level error
                form.setError("root", { type: "server", message: firstMsg });
            }
        });

        return;
    }
}
