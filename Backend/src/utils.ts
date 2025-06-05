import { User } from "./db/postgres/entities/user";
import { ApiResponse } from "./types/response";

export function omit<T extends Record<string, unknown>, K extends (keyof T)[]>(
	obj: T,
	fields: K,
): Omit<T, K[number]> {
	for (const field of fields) {
		delete obj[field];
	}
	return obj;
}

export function sanatiseUser(user: User) {
  return omit(Object(user), ["passwordHash"]);
}

export function createSuccessResponse<T>(
  data: T,
  message?: string,
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function createErrorResponse(
  message: string,
  errors?: any
): ApiResponse {
  return {
    success: false,
    message,
    errors: errors ? { general: [errors] } : undefined,
  };
}