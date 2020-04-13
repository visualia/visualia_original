import { message } from "../utils.js";

export const onError = (error) => message(error);

export const onWarning = (error) => message(error);

export const onCompilerError = (error) => message(error);
