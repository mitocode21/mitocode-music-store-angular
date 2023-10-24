export interface IResponseHome {
	genres: IHomeGenres[];
	concerts: IHomeConcerts[];
	success: boolean;
}

export interface IHomeConcerts {
	id: number;
	title: string;
	description: string;
	place: string;
	unitPrice: number;
	genre: string;
	genreId: number;
	dateEvent: string;
	timeEvent: string;
	imageUrl: string;
	ticketsQuantity: number;
	finalized: boolean;
	status: string;
}

export interface IHomeGenres {
	id: number;
	name: string;
	status: boolean;
}
