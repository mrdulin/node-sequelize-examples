export interface ICoordinates {
  type: string;
  coordinates: number[];
}

export default interface ILocation {
  id: string;
  coordinates: ICoordinates;
  description?: string | undefined | null;
  name: string;
  type_id: number;
  owner: string;
}
