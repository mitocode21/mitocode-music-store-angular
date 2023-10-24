export interface IResponse<T = void> {
	data: T;
	success: boolean;
	errorMessage: string;
}
