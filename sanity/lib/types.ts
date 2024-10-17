export type AttendanceType = {
  _id: string;
  employee: {
    name: string;
    dni: string;
    mainImage?: {
      url: string;
      metadata: {
        lqip: string;
      };
    };
  };
  checkInTime: string | null;
  shift: string;
  status: string;
  permissionDetails?: string;
  associationVisit?: {
    title: string;
  };
};