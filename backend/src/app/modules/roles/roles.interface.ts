export interface IRoleDocument {
  id: string;
  title: string;
  description?: string;
  roleType: 'superAdmin' | 'reportManager';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
