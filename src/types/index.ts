export type AppLayer =
  | 'VISUAL_PORTAL'
  | 'L0_LOGIN'
  | 'L1_HUB'
  | 'L2_MTTQ_UNIT'
  | 'L3_SUPERVISION'
  | 'L3_FEEDBACK_MGMT'
  | 'W1_PUBLIC_HOME'
  | 'W4_REPRESENTATION'
  | 'W5_MEMBER_ORGS'
  | 'W6_TDP_MAP'
  | 'W7_TDP_DETAIL'
  | 'W14_MAILBOX'
  | 'PRD_BLUEPRINT';

export type SystemZone = 'GOVERNANCE' | 'PUBLIC';

export type DesignMode = 'LO_FI_WIREFRAME' | 'HI_FI_SYSTEM';

export type ViewportMode = 'DESKTOP' | 'MOBILE';

export type UiState = 'DEFAULT' | 'LOADING' | 'EMPTY' | 'ERROR';

// --- MTTQ REPRESENTATION TYPES ---
export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  title: string; // Chức vụ Đảng/chính quyền kiêm nhiệm
  phone?: string;
  email?: string;
  assignedArea?: string;
  term: string;
  avatarPlaceholder?: string;
}

export interface CommitteeMember {
  id: string;
  order: number;
  name: string;
  workUnit: string;
  committeeRole: string; // Chức vụ trong UB MTTQ
  block: 'BAN_THUONG_TRUC' | 'TO_CHUC_THANH_VIEN' | 'TRUONG_BAN_CTMT' | 'TIEU_BIEU_TRI_THUC' | 'TON_GIAO_DOANH_NGHIEP';
  phone?: string;
  tdpId?: number;
}

export interface MemberOrganization {
  id: string;
  name: string;
  shortName: string;
  leaderName: string;
  leaderRole: string;
  memberCount: number;
  contactPhone: string;
  description: string;
  iconType: string;
  recentActivities: string[];
}

export interface ResidentialGroup {
  id: number;
  name: string;
  code: string;
  leaderName: string;
  leaderPhone: string;
  coverage: string; // Các tuyến đường ngõ
  culturalHouseAddress: string;
  households: number;
  population: number;
  mapCoordinates: { x: number; y: number; width: number; height: number }; // Relative svg map area
  recentNewsCount: number;
  pendingFeedbackCount: number;
}

// --- SUPERVISION & MONITORING TYPES ---
export type SupervisionType =
  | 'COMMUNITY_INVESTMENT' // Giám sát đầu tư của cộng đồng
  | 'PEOPLE_INSPECTION'    // Ban Thanh tra nhân dân
  | 'DEMOCRACY_GRASSROOTS' // Quy chế dân chủ ở cơ sở
  | 'SOCIAL_WELFARE'       // An sinh xã hội & Chính sách
  | 'PUBLIC_SERVICE';      // Đạo đức công vụ cán bộ

export type SupervisionStatus =
  | 'IN_PROGRESS'          // Đang tiến hành
  | 'FINDINGS_ISSUED'      // Đã có kết luận giám sát
  | 'WAITING_EXPLANATION'  // Đang chờ cơ quan giải trình/khắc phục
  | 'RESOLVED'             // Đã hoàn thành khắc phục
  | 'OVERDUE';             // Quá hạn phản hồi

export interface SupervisionProject {
  id: string;
  code: string;
  title: string;
  type: SupervisionType;
  location: string;
  tdpId: number;
  leadUnit: string; // Ban GSĐTCCĐ / Ban TTND
  inspectorLeader: string;
  targetAgency: string; // Đơn vị chịu sự giám sát (UBND phường, Nhà thầu,...)
  startDate: string;
  dueDate: string;
  status: SupervisionStatus;
  progressPercent: number;
  slaDaysLeft: number;
  budget?: string;
  findingsSummary: string;
  recommendations: string[];
  agencyResponse?: string;
  filesCount: number;
}

// --- FEEDBACK & CITIZEN OPINION TYPES ---
export type FeedbackDomain =
  | 'URBAN_ENVIRONMENT'   // Môi trường - Trật tự đô thị
  | 'CONSTRUCTION_PERMIT'  // Trật tự xây dựng & Quản lý đất đai
  | 'SOCIAL_SECURITY'     // Chế độ chính sách, người có công
  | 'COMMUNITY_RELATIONS' // Hòa giải mâu thuẫn ngõ phố
  | 'CIVIC_SERVICES';     // Thái độ phục vụ cán bộ

export type FeedbackStatus =
  | 'RECEIVED'            // Đã tiếp nhận
  | 'INVESTIGATING'       // Đang xác minh / kiểm tra thực địa
  | 'ANSWERED'            // Đã phản hồi chính thức
  | 'FORWARDED';          // Chuyển UBND hoặc cơ quan chuyên môn

export interface CitizenFeedback {
  id: string;
  trackingCode: string;
  tdpId: number;
  domain: FeedbackDomain;
  title: string;
  content: string;
  isAnonymous: boolean;
  citizenName?: string;
  citizenPhone?: string;
  submissionDate: string;
  dueDate: string;
  slaDaysLeft: number;
  status: FeedbackStatus;
  assignedOfficer: string;
  verificationNotes?: string;
  officialReply?: string;
  replyDate?: string;
  attachmentsCount: number;
}
