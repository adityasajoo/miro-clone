import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutationFunction);

    const mutate = async (variables: any) => {
        setPending(true);
        return apiMutation(variables).finally(() => {
            setPending(false);
        }
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw error;
        });
    }

    return { mutate, pending };

}