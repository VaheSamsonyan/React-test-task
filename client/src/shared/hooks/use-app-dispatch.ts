import { useDispatch } from "react-redux";
import type { AppDispatch } from "@app/store/store.ts";

export const useAppDispatch = () => useDispatch<AppDispatch>();
