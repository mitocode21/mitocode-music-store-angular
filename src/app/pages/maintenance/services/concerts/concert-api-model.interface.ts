//#region  CREATE  / UPDATE EVENT
export interface IRequestCreateUpdateConcert {
	dateEvent: string;
	title: string;
	description: string;
	timeEvent: string;
	idGenre: number;
	place: string;
	base64Image: string;
	fileName: string;
	unitPrice: number;
	ticketsQuantity: number;
}

//#endregion

//#region GET LIST CONCERTS
export interface IResponseConcert {
	id: number;
	title: string;
	place: string;
	dateEvent: string;
	timeEvent: string;
	genre: string;
	genreId: number;
	imageUrl: string;
	description: string;
	ticketsQuantity: number;
	unitPrice: number;
	status: string;
}

//#endregion
