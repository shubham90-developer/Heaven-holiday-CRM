// department.interface.ts
export interface IDepartment {
  _id?: string;
  name: string;
  is_operations: boolean;
  status: 'active' | 'deactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDepartmentDocument extends IDepartment, Document {}
