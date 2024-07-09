export interface Book {
  id:               string;
  title:            string;
  author:           string;
  image:            string;
  genre:            string;
  isbn:             string;
  published:        Date;
  publisher:        string;
  description:      string;
}

export enum Genre {
  Ut = "Ut",
  Nam = "Nam",
  Voluptatem = "Voluptatem",
  Unde = "Unde",
  Aperiam = "Aperiam",
  In = "In"
}
