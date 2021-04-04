import { Movie } from "./Movie";

export interface Data {
    page:number;
    results:Movie[];
    total_pages:number;
    total_results:number;
}
