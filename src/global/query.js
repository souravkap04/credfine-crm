import { useLocation } from "react-router-dom";
export const useQueryy = () => {
    return new URLSearchParams(useLocation().search);
};