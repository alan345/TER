export interface Worker {
  id: string;
  createdAt: Date;
  metadata: string;
  status:
    | "pending"
    | "require_pii"
    | "manual_review"
    | "active"
    | "denied"
    | "pending_closure"
    | "closed";
  profile: {
    phoneNumber: string;
    email: string;
    address: {
      street: string;
      street2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}
