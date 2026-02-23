export interface LogRequest {
  id?: number;
  date: string;
  httpMethod: string;
  endpoint: string;
  status: number;
  response: string;
}
