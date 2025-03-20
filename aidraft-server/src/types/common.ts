export type DatabaseInfo = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export type FirebaseEnvConfig = {
  project_id: string;
  private_key: string;
  client_email: string;
};

export interface IAuthUser {
  userId: string;
  email: string;
}
