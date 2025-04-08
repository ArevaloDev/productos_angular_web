export interface Toast{
  text:string;
  type?: 'success' | 'danger' | 'info' | 'warning';
  delay?: number;
}
