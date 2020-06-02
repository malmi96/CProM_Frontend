export interface Customer {
  id: string;
  customerName: string;
  email: string;
  nic: string;
  address: string;
  contactNo: number;
  password: string;
}

export interface Employee {
  id: string;
  employeeName: string;
  email: string;
  nic: string;
  address: string;
  contactNo: number;
  designation: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
  userType: string;
}
