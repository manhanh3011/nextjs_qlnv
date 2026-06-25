type ImportStatus = "ALL" | "VALID" | "INVALID" | "PENDING";

type ImportRawRow = {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
  role: string;
  level: string;
  status: string;
  isScanned: boolean;
  isValid: boolean | null;
  errorMessage: string | null;
  processedAt: string | null;
};

type ImportSummary = {
  total: number;
  valid: number;
  invalid: number;
  pending: number;
};