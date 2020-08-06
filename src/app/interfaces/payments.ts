export interface CustomerPayment {
  id: string;
  customerName: string;
  projectName: string;
  paymentDate: Date;
  paymentType: string;
  amount: number;
  method: string;
  description: string;
}

export interface LabourWages {
  id: string;
  labour: string;
  nic: string;
  projectName: string;
  stageName: string;
  paymentDate: Date;
  paymentType: string;
  amount: number;
  description: string;
}

export interface MaterialPayment {
  id: string;
  materialName: string;
  supplierName: string;
  date: Date;
  amount: string;
  description: string;
}

export interface MachineryPayment {
  id: string;
  machineryName: string;
  supplierName: string;
  date: Date;
  amount: number;
  paymentType: string;
  description: string;
}

export interface UtilityPayment {
  id: string;
  paymentType: string;
  projectName: string;
  stageName: string;
  paymentDate: Date;
  amount: string;
  description: string;
}
