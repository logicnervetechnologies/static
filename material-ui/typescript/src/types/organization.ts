export interface OrganizationRole {
  role: string;
  users: [string];
}

export interface Organization {
  address: string | null;
  admins: [string];
  alwaysAskAddingPatient: boolean;
  alwaysAskAddingProvider: boolean;
  noRole: [string];
  orgId: string;
  orgName: string;
  owner: [string]
  roles: [OrganizationRole]
  _id: string;
}
